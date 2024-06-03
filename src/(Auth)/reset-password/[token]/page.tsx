import ResetPassword from '../../../ForgetPassword/ResetPassword'
import { ResetPasswordProps } from '../../../passwordTypes'
import React from 'react'

const page = ({ params }: ResetPasswordProps) => {
    return (
        <ResetPassword
            params={params}
        />
    )
}

export default page