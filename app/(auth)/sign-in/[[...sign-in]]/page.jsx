import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <SignIn />

        </div>
      </div>

      <img
        alt=""
        src="loginicon.jpg"
        className="h-['100%'] w-full object-cover sm:h-full"
      />
    </section>
  )
}