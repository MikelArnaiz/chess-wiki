import { createContext } from 'react'
import { idle, type Status } from '../utils/Status'
import type { PlayerJSON } from '../api/fetchUsername'

export type UsersContext = {
  usersList: Status<string[]>
  usersData: Partial<Record<string, Status<PlayerJSON>>>
  onSetUsers: (result: Status<string[]>) => void
  onSetUserData: (username: string, result: Status<PlayerJSON>) => void
}

export const UsersContext = createContext<UsersContext>({
  usersList: idle,
  usersData: {},
  onSetUsers: () => {},
  onSetUserData: () => {},
})
