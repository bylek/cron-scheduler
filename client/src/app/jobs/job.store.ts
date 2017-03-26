export const jobs = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_JOBS':
      return payload;
    case 'ADD_JOB':
      const job = state.find(({id}) => id == payload.id);
      if (job) {
        return state.map(item => {
          return item.id === payload.id ? Object.assign({}, item, payload) : item;
        });
      }

      return [
        ...state,
        payload
      ];
    case 'CREATE_JOB':
      return [
        ...state,
        payload
      ];
    case 'UPDATE_JOB':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_JOB':
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};
