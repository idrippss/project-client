import React from 'react';
import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url("/path/to/your/background.jpg")' }}
    >
      {/* Main Container */}
      <Container className="bg-white bg-opacity-0 p-8 rounded-lg shadow-2xl max-w-6xl mt-10 mb-10">
        {/* Header Section */}
        <div className="text-center mb-12 px-4">
          <Typography
            variant="h2"
            component="h1"
            className="mb-4 font-extrabold text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            LES LABORATOIRES <span className="font-bold">SPIRUNAT</span>
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            className="mb-8 text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            L'énergie de la nature, au service de votre bien-être
          </Typography>
        </div>

        {/* Our Story Section */}
        <div className="bg-transparent p-0 md:p-8 text-white mb-12">
          <Typography
            variant="h3"
            component="h2"
            className="text-center font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Notre Histoire
          </Typography>
          <p className="text-lg leading-relaxed italic font-light mb-6">
            Depuis sa création, SPIRUNAT s’impose comme une référence en matière
            d'innovation dans le domaine des microalgues et de la santé
            naturelle. Notre objectif est de révolutionner l’industrie de la
            micronutrition et des cosmétiques naturels en offrant des solutions
            innovantes et respectueuses de l’environnement.
          </p>
        </div>

        {/* Feature Blocks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-10 px-4">
          {/* First Block */}
          <div className="grid place-items-center h-full px-8 py-6 bg-[#ffffff6c] rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="block text-4xl font-semibold leading-[1.3] text-center">
              Pionnier de la Micronutrition et des Cosmétiques Naturels
            </h2>
            <p className="block my-2 text-base w-full text-center font-normal">
              Notre laboratoire dispose d’une équipe de chercheurs dévoués,
              spécialisés dans l’étude et l’extraction des actifs des
              microalgues, en particulier la spiruline, une source inépuisable
              de bienfaits pour la santé.
            </p>
          </div>
          {/* Second Block */}
          <div className="bg-[#ffffff00] p-6 rounded-lg text-white transition-all duration-300 hover:scale-105">
            <img
              src="/src/assets/images/web/image0_0.jpg"
              alt="Image description"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          {/* Third Block */}
          <div className="grid place-items-center h-full px-8 py-6 bg-[#ffffff6c] rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="block text-4xl font-semibold leading-[1.3] text-center">
              Innover pour l'avenir
            </h2>
            <p className="block my-2 text-base w-full text-center font-normal">
              Nous croyons fermement que les solutions naturelles sont l'avenir
              de la santé.
            </p>
          </div>
          {/* Fourth Block */}
          <div className="grid place-items-center h-full px-8 py-6 bg-[#ffffff6c] rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="block text-4xl font-semibold leading-[1.3] text-center">
              Un engagement pour l'excellence et la durabilité
            </h2>
            <p className="block my-2 text-base w-full text-center font-normal">
              Chaque produit développé par SPIRUNAT est le fruit d'une recherche
              minutieuse et d'un engagement indéfectible pour la qualité.
            </p>
          </div>
        </div>
        {/* Mission Statement Section */}
        <div className="bg-transparent p-0 md:p-8 text-white mb-12">
          <Typography
            variant="h3"
            component="h2"
            className="text-center font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Notre Mission
          </Typography>
          <p className="text-lg leading-relaxed mb-6">
            Notre mission est de créer des produits naturels et de haute qualité
            en utilisant les bienfaits des microalgues, principalement la
            spiruline, pour améliorer la santé et le bien-être de nos clients.
            Nous croyons fermement que la nature possède tout ce dont nous avons
            besoin pour vivre en pleine santé.
          </p>
        </div>
        {/* Core Values Section */}
        <div className="bg-transparent p-0 md:p-8 text-white mb-12">
          <Typography
            variant="h3"
            component="h2"
            className="text-center font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Nos Valeurs
          </Typography>
          <ul className="text-lg list-disc pl-6">
            <li>Innovation continue pour un avenir plus sain</li>
            <li>Durabilité et respect de l'environnement</li>
            <li>Engagement envers l'excellence et la qualité</li>
            <li>Transparence et intégrité dans toutes nos démarches</li>
          </ul>
        </div>
        {/* Customer Testimonials Section */}
        <div className="bg-transparent p-0 md:p-8 text-white mb-12">
          <Typography
            variant="h3"
            component="h2"
            className="text-center font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Témoignages Clients
          </Typography>
          <div className="space-y-6">
            <div className="bg-[#ffffff6c] p-6 rounded-lg text-white">
              <Typography variant="body1" className="italic">
                "Les produits de SPIRUNAT ont vraiment changé ma vie. Je me
                sens plus énergique et en meilleure santé depuis que j'ai
                intégré la spiruline dans ma routine."
              </Typography>
              <Typography variant="body2" className="mt-4 font-bold">
                – Samira, Cliente fidèle
              </Typography>
            </div>
            <div className="bg-[#ffffff6c] p-6 rounded-lg text-white">
              <Typography variant="body1" className="italic">
                "Je recommande vivement les produits SPIRUNAT à toute
                personne soucieuse de sa santé. La qualité et les bienfaits sont
                indéniables."
              </Typography>
              <Typography variant="body2" className="mt-4 font-bold">
                – Mohamed, Client satisfait
              </Typography>
            </div>
          </div>
        </div>
        {/* Outro Section */}
        <div className="mt-10 text-center italic text-lg text-white">
          <p>
            Chez SPIRUNAT, nous sélectionnons avec soin des matériaux de haute
            qualité et les fabriquons avec la plus grande précision en Tunisie.
          </p>
        </div>
      </Container>
    </div>
  );
}