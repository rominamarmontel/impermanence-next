import DashboardTop from '@/components/DashboardTop'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }
  return <DashboardTop />
}

export default Dashboard
