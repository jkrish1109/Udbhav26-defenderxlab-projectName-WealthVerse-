import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="flex justify-center items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-3xl font-bold gradient-text">WealthVerse</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-white">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="py-8 px-4 sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
              <div className="mt-1">
                <input id="name" name="name" type="text" required 
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" required 
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required 
                  className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                />
              </div>
            </div>

            <div>
              <Link to="/dashboard">
                <Button variant="primary" className="w-full flex justify-center py-2 px-4">Sign up</Button>
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
