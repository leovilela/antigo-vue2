export const errorTreatment = (error, commit, commitProps = null) => {

  if (error.status === 204) {
    return false
  }
  console.error(error);
  if (!commitProps) {
    return false
  }
  const {mutationName, payload} = commitProps
  commit(mutationName, payload)
  return true
}
