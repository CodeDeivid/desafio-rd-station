import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useProducts from './hooks/useProducts';
import useRecommendations from './hooks/useRecommendations';

const Hero = () => (
  <header className="mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center text-white shadow-lg">
    <img
      src="/rd-station-white.svg"
      alt="Logo RD Station"
      className="mx-auto mb-2 h-12"
    />
    <h1 className="mb-2 text-3xl font-bold md:text-4xl">
      Recomendador de Produtos
    </h1>
    <p className="mx-auto max-w-xl text-blue-100">
      Encontre a solução ideal de CRM e Marketing para o seu negócio em
      segundos.
    </p>
  </header>
);

function App() {
  const { products, features, preferences } = useProducts();
  const { recommendations, setRecommendations } = useRecommendations(products);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Hero />

        <main className="mx-auto max-w-7xl">
          <section className="overflow-hidden rounded-2xl border bg-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="bg-gray-50 p-6 lg:col-span-5 lg:border-r lg:p-8">
                <Form
                  onUpdate={setRecommendations}
                  products={products}
                  preferences={preferences}
                  features={features}
                />
              </div>

              <div className="p-6 lg:col-span-7 lg:p-8">
                <RecommendationList recommendations={recommendations} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
