import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SpinnerFullPage from '@/components/SpinnerFullPage/SpinnerFullPage.tsx';
import { AuthProvider } from '@/contexts/FakeAuth/FakeAuthProvider.tsx';
import { ProtectedRoute } from '@/pages/ProtectedRoute/ProtectedRoute.tsx';

import { CitiesProvider } from './contexts/Cities/CitiesProvider.tsx';
import { City } from './features/app/City/City.tsx';
import { CityList } from './features/app/CityList/CityList.tsx';
import { CountryList } from './features/app/CountriesList/CountryList.tsx';
import { Form } from './features/app/Form/Form.tsx';

const Home = lazy(() => import('./pages/Home/Home.tsx'));
const Login = lazy(() => import('./pages/Login/Login.tsx'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout.tsx'));
const PageNotFound = lazy(
  () => import('./pages/PageNotFound/PageNotFound.tsx'),
);

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="signup" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
