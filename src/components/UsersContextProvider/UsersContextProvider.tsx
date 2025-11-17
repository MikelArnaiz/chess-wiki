import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { idle, type Status } from '../../utils/Status'
import { UsersContext } from '../../hooks/UsersContext'

type UsersContextProviderProps = {
  children: ReactNode
}
export const UsersContextProvider = (props: UsersContextProviderProps) => {
  const [usersList, setUsersList] = useState<Status<string[]>>(idle)

  const onSetUsers = useCallback((result: Status<string[]>) => {
    setUsersList(result)
  }, [])

  const value = useMemo(
    (): UsersContext => ({
      usersList,
      onSetUsers,
    }),
    [onSetUsers, usersList],
  )

  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  )
}
