/* eslint-disable react-hooks/exhaustive-deps */
import APICallStatushandler from '@/components/Shared/APICallStatushandler';
import Loader from '@/components/Shared/Loader';
import { Button } from '@/components/ui/button';
import { PATH } from '@/path';
import { useVerifyEmailQuery } from '@/redux/api/userApi';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const Verifyemail = () => {
    const router = useRouter();

    console.log('params', router.query.verificationCode);

    const { data, isLoading, isError, error, isSuccess } = useVerifyEmailQuery(router.query.verificationCode);
    console.log('error', error)


    const goToLogin = () => {
        router.replace(PATH.login)
    }

    return (
        <div>
            {/* {isLoading && <Loader />} */}
            <APICallStatushandler
				options={{data, isLoading, isError, error, isSuccess }}
			/>
            <main className="min-h-screen flex flex-col sm:flex-row overflow-y-auto">
                <div className="min-h-96 md:w-7/12 flex flex-col py-15 px-11 md:py-20 md:px-16">
                    <h1 className="font-bold text-3xl md:text-5xl sm:py-5 text-theamP">
                        Capital Transactions
                    </h1>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-6 sm:px-1 sm:py-5">
                            <h2 className="text-3xl md:text-6xl">
                                Email Verification !
                            </h2>
                            <p className="md:w-8/12">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            {/* <Link
								href={PATH.register}
								className="bg-theamP  w-1/3 sm:w-52 py-2 block text-white rounded-md text-center"
							>
								Register
							</Link> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-center items-center bg-theamP px-10">
                    <div className="text-white space-y-10 sm:w-11/12 text-center">
                        <>
                            <h2 className="font-medium text-xl text-center">
                                {isLoading ? 'Verifying Your Account...' : error?.data ? error.data?.message : 'Verified'}
                            </h2>
                            {!isLoading && (
                                <Button onClick={goToLogin} className='py-2 bg-slate-100 text-theamP px-8 text-center' href={PATH.login}>Click hear to Login</Button>
                            )}
                        </>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Verifyemail