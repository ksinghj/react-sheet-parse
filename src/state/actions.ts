export interface CreateSetPayload {
  stackName: string
  stackData: [string, string][]
}

export const CREATE_SET = 'create_set'
