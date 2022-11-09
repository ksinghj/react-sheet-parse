import { CREATE_SET, CreateSetPayload } from './actions'

const reducer = (state: any, action: { type: string; payload: CreateSetPayload }) => {
  switch (action.type) {
    case CREATE_SET:
      return { ...state, [action.payload.stackName]: action.payload.stackData }

    default:
      console.log('action type not handled')
      break
  }
}

export default reducer
