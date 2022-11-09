export type StackCards = [string, string][]

export interface StackSet {
  [stackName: string]: StackCards
}
