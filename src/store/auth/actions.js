import {
  CLEAN_TOKEN, CLEAN_DOCUMENT_NUMBER, SET_DOCUMENT_NUMBER, SET_TOKEN, SET_SYSTEM_TOKEN, SET_ANONYMOUS_USER, SET_FIREBASE_USER_REF, SET_FIREBASE_PASSWORD_CHANGED,
} from "./mutations";

export default {
  cleanAuth({ commit }) {
    commit(CLEAN_TOKEN);
    commit(CLEAN_DOCUMENT_NUMBER);
  },
  async validateRequest({ commit, dispatch }, token) {
    try {
      await dispatch("getSystemToken");
      const documentNumber = await this.$services.auth.validateRequestLogin(token);
      commit(SET_DOCUMENT_NUMBER, documentNumber);
      commit(SET_TOKEN, token);
    } catch (error) {
      throw error;
    }
  },
  async getSystemToken({ commit, state }) {
    try {
      if (state.systemToken) {
        return;
      }
      const systemToken = await this.$services.auth.getSystemToken();
      commit(SET_SYSTEM_TOKEN, systemToken);
    } catch (error) {
      throw error;
    }
  },

  async changePassword({ state, commit, dispatch }, form) {
    try {
      const changePassword = await this.$services.auth.changePassword({
        idRequest: state.token,
        password: form.newPassword,
        passwordConfirm: form.confirmNewPassword,
      });
      const documentNumber = changePassword.split("@")[0];
      commit(SET_FIREBASE_PASSWORD_CHANGED, form.newPassword);
      commit(SET_DOCUMENT_NUMBER, `${documentNumber}@soulisto.com.br`);
      await dispatch("signInAnonymously");
      await dispatch("getFirebaseUser");
      await dispatch("deleteAnonymousUser");
      return changePassword;
    } catch (error) {
      throw error;
    }
  },

  async getFirebaseUser({ state }) {
    const userCollection = this.$fireStore.collection("users");
    await userCollection.where("email", "==", state.documentNumber)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const firebaseUserRef = doc.ref;
          await firebaseUserRef.collection("/change_password").add({ password: state.firebasePasswordChanged });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },

  async signInAnonymously({ commit }) {
    const anonymousUser = await this.$fireAuth.signInAnonymously();
    commit(SET_ANONYMOUS_USER, anonymousUser);
  },

  async deleteAnonymousUser({ state }) {
    const anonymousUser = state.anonymousUser;
    await anonymousUser.user.delete();
    await this.$fireAuth.signOut();
  },
};
