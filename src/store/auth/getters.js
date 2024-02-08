// eslint-disable-next-line
export const getToken = (state) => `${state.tokenType} ${state.accessToken}`;

export const isUserOwner = (state, getters, rootState) => rootState.roles.includes('ec_owner') || rootState.roles.includes('lf_admin')
