import { SET_SYSTEM_PERMISSIONS, SET_USER_PERMISSIONS } from './mutations'

export default {
  async getUserPermissions({ commit, rootState, dispatch, redirect}) {
    try {      
      const permissions = await this.$services.client.getUserPermissions(rootState.auth.user.userId)
      commit(SET_USER_PERMISSIONS,permissions)
    } catch (error) {
      if (error.request.status === 204) {
        throw error
      }
      
      if (error.request.status === 401) {
        await dispatch("renewToken", null, { root: true });
      }        
      
      if (error.request.status > 401) {        
          this.$services.swal('Erro', 'Falha ao resgatar permissões do usuario').callDanger();
          this.$router.push('/login');
          throw error
      }      
    
    this.$router.push('/painel-do-cliente');          
    
    }
  },

  async getPermissions({commit, dispatch, rootGetters, rootState, redirect}) {
    try {
      const permissions = await this.$services.client.getAllPermissions(rootState.podeTransacionar, rootState.transaction.typesOfservices)
      commit(SET_SYSTEM_PERMISSIONS, permissions)
      if (!rootGetters['auth/isUserOwner']) {
        await dispatch('getUserPermissions')
      }
    } catch (error) {      
        if (error.request.status === 204) {
          throw error
        }
        
        if (error.request.status === 401) {
          await dispatch("renewToken", null, { root: true });
        }        
        
        if (error.request.status > 401) {        
            this.$services.swal('Erro', 'Falha ao resgatar permissões do usuario').callDanger();
            this.$router.push('/login');
            throw error
        }      
      
      this.$router.push('/painel-do-cliente');            
      
    }
  }

}
