import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaChartLine, FaCode, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserStatus } from '../RTK/features/authSlice';

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => { 
    if (isAuthenticated) {
      navigate('/home');
    }
    fetch
  },[isAuthenticated])
  useEffect(() => {
    const fetchToHome = async () => {
      try {
        await dispatch(getUserStatus()).unwrap();
        if (isAuthenticated) {
          navigate('/home');
        }
      } catch (error) {
        console.log('Error fetching user status:', error);
      }
    } 
    fetchToHome()
  },[]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
        <div className="container px-4 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Monitor Your <span className="text-primary">GitHub</span> Activity
              </h1>
              <p className="text-xl text-muted-foreground">
                Track commits, analyze contributions, and monitor repository health - all in one place.
              </p>

              {/* Replaced Button */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-medium">
                    Get Started
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md text-lg font-medium">
                    Log In
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-card p-6 rounded-lg shadow-xl">
                  <FaGithub className="w-24 h-24 mx-auto mb-6 text-primary" />
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <div className="h-16 bg-muted rounded"></div>
                      <div className="h-16 bg-muted rounded"></div>
                      <div className="h-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Powerful Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to monitor and improve your GitHub presence
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 text-center bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                <FaChartLine className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Contribution Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Visualize your contribution patterns and identify trends over time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 text-center bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                <FaCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Commit Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor your commits across repositories with detailed insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 text-center bg-card rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                <FaShieldAlt className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Repository Health</h3>
              <p className="mt-2 text-muted-foreground">
                Assess the health of your repositories with key metrics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to optimize your GitHub workflow?</h2>
          <p className="mt-4 text-lg">
            Join thousands of developers who use GitPulse to improve their GitHub presence
          </p>
          <Link to="/register">
            <button className="mt-8 px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90">
              Sign Up Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
