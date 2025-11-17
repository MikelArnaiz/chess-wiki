import { createContext } from 'react'
import { idle, type Status } from '../utils/Status'

export type UsersContext = {
  usersList: Status<string[]>
  onSetUsers: (result: Status<string[]>) => void
}

export const UsersContext = createContext<UsersContext>({
  usersList: idle,
  onSetUsers: () => {},
})
