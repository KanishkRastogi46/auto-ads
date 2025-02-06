import GoogleButton from 'react-google-button'

export default function SigninWithGoogle() {
    return (
        <>
            <div className="h-screen bg-gray-900 flex justify-center items-center">
                <GoogleButton
                    onClick={() => { window.location = `${import.meta.env.VITE_API_URL}/auth/google` }}
                />
            </div>
        </>
    )
}