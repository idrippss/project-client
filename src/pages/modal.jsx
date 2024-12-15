import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    no_of_dependents: '',
    education: 'Not Graduate',
    self_employed: 'No',
    income_annum: '',
    loan_amount: '',
    loan_term: '',
    cibil_score: '',
    residential_assets_value: '',
    commercial_assets_value: '',
    luxury_assets_value: '',
    bank_asset_value: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error making POST request', error);
      setResponse({ error: 'Error making request' });
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen">
      <div className="text-center mb-12 mt-8 px-4">
        <Typography variant="h2" component="h1" className="mb-4 font-extrabold" style={{ fontFamily: 'Poppins, sans-serif', color: '#FFFFff' }}>
          LES LABORATOIRES <span className="font-bold">SPIRUNAT</span>
        </Typography>
        <Typography variant="h6" component="h2" className="mt-12" style={{ fontFamily: 'Poppins, sans-serif', color: '#FFFFFF' }}>
          L'énergie de la nature, au service de votre bien-être
        </Typography>
      </div>

      <div className="min-h-screen flex justify-center mt-0">
        <div className="bg-transparent p-5 rounded-lg shadow-2xl w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-7 text-white" style={{ fontFamily: 'Poppins, sans-serif', marginTop: '0px' }}>
            LES ORIGINES DE NOS PRODUITS
          </h2>
          <h3 className="text-white text-center mb-6">
            <b>Les microalgues </b> sont essentielles à notre écosystème, purifiant l'air en absorbant le dioxyde de carbone et produisant de l'oxygène. Considérées comme des super-aliments, elles regorgent de nutriments bénéfiques pour la santé, et leur intégration dans notre alimentation favorise une approche durable face aux défis environnementaux. Les microalgues que nous valorisons chez Spirunat sont :
          </h3>

          {/* Icons with Links */}
          <div className="hidden py-4 mt-4 sm:flex justify-center space-x-24">
            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <Link to="/microalgues/spiruline">
              <img src="/src/assets/images/icons/spiruline-icone.png" alt="Spiruline logo" className="h-28 w-28 relative z-0 rounded-lg" />
              </Link>
              <span className="mt-2 text-xl font-semibold text-white text-center"></span>
            </span>

            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <Link to="/microalgues/astaxanthyne">
                <img src="/src/assets/images/icons/astaxanthine-icone.png" alt="Astaxanthine logo" className="h-28 w-28 relative z-0 rounded-lg" />
              </Link>
              <span className="mt-2 text-xl font-semibold text-white text-center"></span>
            </span>

            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <Link to="/microalgues/dunaliella">
                <img src="/src/assets/images/icons/dunaliella-icone.png" alt="Dunaliella logo" className="h-28 w-28 relative z-0 rounded-lg" />
              </Link>
              <span className="mt-2 text-xl font-semibold text-white text-center"></span>
            </span>

            <span className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-125">
              <Link to="/microalgues/phycocyanine">
                <img src="/src/assets/images/icons/phycocyanine-icone.png" alt="Phycocyanine logo" className="h-28 w-28 relative z-0 rounded-lg" />
              </Link>
              <span className="mt-2 text-xl font-semibold text-white text-center"></span>
            </span>
          </div>

          <h2 className="text-3xl font-bold text-center mb-12  text-white" style={{ fontFamily: 'Poppins, sans-serif', marginTop: '70px' }}>
            LES MICROALGUES
          </h2>
          <h3 className="text-white text-center mb-6">
            <b>Les microalgues</b> jouent un rôle crucial dans notre écosystème. Elles produisent environ 70 % de l'oxygène que nous respirons. Ces organismes aident à purifier l'atmosphère en absorbant le dioxyde de carbone. Riches en nutriments, elles sont considérées comme des super-aliments. Elles offrent une abondance de protéines, vitamines et antioxydants. Les microalgues sont particulièrement bénéfiques pour la santé, soutenant le bien-être général. Intégrer les microalgues dans notre alimentation favorise une approche durable face aux défis environnementaux actuels.
          </h3>

          {response && (
            <div className={`mt-6 p-4 rounded-md ${response.prediction === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <h3 className="text-xl font-bold">AI Prediction:</h3>
              <p>Prediction: {response.prediction.trim()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
