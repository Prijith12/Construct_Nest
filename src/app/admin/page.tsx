import React from 'react'
import Users from './_components/users';
import { allUsers } from './_actions/user';

export default async function AdminHome() {
  const userDetials=await allUsers()
  return (
    <>
    <Users userDetails={userDetials}/>
    </>
  )
}

