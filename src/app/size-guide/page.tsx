'use client';
import { useTranslation } from 'react-i18next';

interface SizeGuideTranslations {
  title: string;
  description: string;
  howToMeasure: {
    title: string;
    steps: string[];
  };
  sizeCharts: {
    title: string;
    tshirts: {
      title: string;
      chest: string;
      length: string;
    };
    pants: {
      title: string;
      waist: string;
      inseam: string;
    };
  };
}

export default function SizeGuidePage() {
  const { t, ready } = useTranslation();
  const translations = t('sizeGuidePage', { returnObjects: true }) as SizeGuideTranslations;

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!translations) {
    return <div>Error loading translations</div>;
  }

  return (
    <main className="flex flex-col gap-12">
      <h1 className="text-2xl font-bold">{translations.title}</h1>
      <div className="max-w-2xl">
        <p className="text-lg mb-6">
          {translations.description}
        </p>
        <div className="grid gap-6">
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.howToMeasure?.title || 'How to Measure'}</h2>
            <div className="grid gap-4">
              {Array.isArray(translations.howToMeasure?.steps) ? (
                translations.howToMeasure.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))
              ) : (
                <p>Loading measurements...</p>
              )}
            </div>
          </div>
          
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.sizeCharts?.title || 'Size Charts'}</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{translations.sizeCharts?.tshirts?.title || 'T-Shirts'}</h3>
                <table className="w-full border border-solid border-border-primary">
                  <thead>
                    <tr className="bg-black">
                      <th className="p-2">Size</th>
                      <th className="p-2">{translations.sizeCharts?.tshirts?.chest || 'Chest (cm)'}</th>
                      <th className="p-2">{translations.sizeCharts?.tshirts?.length || 'Length (cm)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">S</td>
                      <td className="p-2 border border-solid border-border-primary">92-96</td>
                      <td className="p-2 border border-solid border-border-primary">69</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">M</td>
                      <td className="p-2 border border-solid border-border-primary">98-102</td>
                      <td className="p-2 border border-solid border-border-primary">71</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">L</td>
                      <td className="p-2 border border-solid border-border-primary">104-108</td>
                      <td className="p-2 border border-solid border-border-primary">73</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">XL</td>
                      <td className="p-2 border border-solid border-border-primary">110-114</td>
                      <td className="p-2 border border-solid border-border-primary">75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{translations.sizeCharts?.pants?.title || 'Pants'}</h3>
                <table className="w-full border border-solid border-border-primary">
                  <thead>
                    <tr className="bg-black">
                      <th className="p-2">Size</th>
                      <th className="p-2">{translations.sizeCharts?.pants?.waist || 'Waist (cm)'}</th>
                      <th className="p-2">{translations.sizeCharts?.pants?.inseam || 'Inseam (cm)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">S</td>
                      <td className="p-2 border border-solid border-border-primary">76-80</td>
                      <td className="p-2 border border-solid border-border-primary">76</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">M</td>
                      <td className="p-2 border border-solid border-border-primary">82-86</td>
                      <td className="p-2 border border-solid border-border-primary">78</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">L</td>
                      <td className="p-2 border border-solid border-border-primary">88-92</td>
                      <td className="p-2 border border-solid border-border-primary">80</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-solid border-border-primary">XL</td>
                      <td className="p-2 border border-solid border-border-primary">94-98</td>
                      <td className="p-2 border border-solid border-border-primary">82</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
