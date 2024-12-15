import React from 'react';
import { Typography } from '@mui/material';

export default function Expertise() {
  return (
    <div className="text-center mb-4 mt-2 px-4">
      {/* Intro Section */}
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
        className="mt-0 text-white" 
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Pionnier de la micronutrition et des cosmétiques naturels
      </Typography>
      
      {/* Main Content Section */}
      <div className="bg-transparent p-0 md:p-8 text-white">
        {/* Introductory Paragraph */}
        <p className="text-lg leading-relaxed mb-0 italic font-light">
          Depuis sa création, SPIRUNAT s’impose comme une référence en matière d'innovation dans le domaine des microalgues et de la santé naturelle.
        </p>

        {/* Two-Column Layout with Background Blocks and Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-10 px-4">
          
          {/* First Block with Background and Hover Effect */}
          <div className="bg-[#ffffff6c] p-6 rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Une unité de recherche et développement à la pointe</h2>
            <p className="text-lg leading-relaxed">
              Notre laboratoire dispose d’une équipe de chercheurs dévoués, spécialisés dans l’étude et l’extraction des actifs des microalgues, en particulier la spiruline, une source inépuisable de bienfaits pour la santé. Ces efforts sont soutenus par des collaborations avec des centres de recherche internationaux, nous permettant ainsi de rester à l’avant-garde de l’innovation.
            </p>
          </div>

          <div className="bg-[#ffffff6c] p-6 rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Des actifs naturels purs et concentrés</h2>
            <p className="text-lg leading-relaxed">
              Chez SPIRUNAT, la pureté des ingrédients est une priorité. Nous mettons un point d'honneur à développer des extraits de spiruline et autres microalgues d'une qualité exceptionnelle, sans compromis sur la concentration des nutriments et des propriétés antioxydantes. Notre objectif est de proposer des produits qui ne se contentent pas d’améliorer le bien-être, mais qui apportent des bénéfices tangibles et mesurables pour la santé et la beauté.
            </p>
          </div>

          {/* Second Block with Background and Hover Effect */}
          <div className="bg-[#ffffff6c] p-6 rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Innover pour l'avenir</h2>
            <p className="text-lg leading-relaxed">
              Nous croyons fermement que les solutions naturelles sont l'avenir de la santé. Notre engagement envers la recherche et le développement nous permet de créer des compléments alimentaires et des soins cosmétiques hautement efficaces, conçus pour répondre aux besoins spécifiques des consommateurs exigeants. SPIRUNAT se distingue ainsi par sa capacité à allier innovation technologique et respect de la nature.
            </p>
          </div>

          <div className="bg-[#ffffff6c] p-6 rounded-lg text-white transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Un engagement pour l'excellence et la durabilité</h2>
            <p className="text-lg leading-relaxed">
              Chaque produit développé par SPIRUNAT est le fruit d'une recherche minutieuse et d'un engagement indéfectible pour la qualité. Notre équipe travaille sans relâche pour perfectionner nos procédés d’extraction et garantir la durabilité de nos produits, tant pour la santé des individus que pour celle de la planète. Notre vision : transformer les trésors des microalgues en solutions de santé et de beauté qui marquent une véritable différence.
            </p>
          </div>
        </div>

        {/* Outro Section */}
        <div className="mt-10 text-center italic text-lg text-white">
          <p>
            Chez SPIRUNAT, nous sélectionnons avec soin des matériaux de haute qualité et les fabriquons avec la plus grande précision en Tunisie.
          </p>
        </div>
      </div>
    </div>
  );
}
