export const servers = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_SERVERS':
      return payload;
    case 'ADD_SERVER':
      const server = state.find(({id}) => id == payload.id);
      if (server) {
        Object.assign(server, payload);
        return [...state];
      }

      return [
        ...state,
        payload
      ];
    case 'CREATE_SERVER':
      return [
        ...state,
        payload
      ];
    case 'UPDATE_SERVER':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_SERVER':
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};
