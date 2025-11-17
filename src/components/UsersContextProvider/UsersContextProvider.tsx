import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { idle, type Status } from '../../utils/Status'
import { UsersContext } from '../../hooks/UsersContext'
import type { PlayerJSON } from '../../api/fetchUsername'

type UsersContextProviderProps = {
  children: ReactNode
}
export const UsersContextProvider = (props: UsersContextProviderProps) => {
  const [usersList, setUsersList] = useState<Status<string[]>>(idle)
  const [usersData, setUsersData] = useState<
    Record<string, Status<PlayerJSON>>
  >({})

  const onSetUsers = useCallback((result: Status<string[]>) => {
    setUsersList(result)
  }, [])

  const onSetUserData = useCallback(
    (username: string, result: Status<PlayerJSON>) => {
      setUsersData((prev) => ({
        ...prev,
        [username]: result,
      }))
    },
    [],
  )

  const value = useMemo(
    (): UsersContext => ({
      usersList,
      usersData,
      onSetUsers,
      onSetUserData,
    }),
    [onSetUsers, onSetUserData, usersList, usersData],
  )

  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  )
}
