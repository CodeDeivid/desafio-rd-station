function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="mb-6 border-b pb-2 text-2xl font-bold text-gray-800">
        Recomendações para você:
      </h2>

      {recommendations.length === 0 && (
        <div className="rounded-md bg-blue-50 p-4 text-blue-700">
          Nenhuma recomendação encontrada com os critérios selecionados.
        </div>
      )}

      <ul className="space-y-6">
        {recommendations.map((recommendation) => (
          <li
            key={recommendation.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between border-b border-gray-100 bg-gray-50 p-5">
              <h3 className="text-xl font-bold text-gray-900">
                {recommendation.name}
              </h3>
              <span className="mt-1 inline-block rounded border border-gray-200 bg-white px-2 py-0.5 text-sm font-medium text-gray-500">
                {recommendation.category}
              </span>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center font-semibold text-gray-700">
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  Principais Funcionalidades
                </h4>
                <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-600">
                  {recommendation.features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 flex items-center font-semibold text-gray-700">
                  <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                  Preferências Atendidas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.preferences?.map((pref, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-purple-100 bg-purple-50 px-2 py-1 text-xs text-purple-700"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
