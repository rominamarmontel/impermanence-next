'use client'
import Image from 'next/image'
import styles from './styles.module.css'
import { useState } from 'react'

const AboutPage = () => {
  const [isEnglish, setIsEnglish] = useState(true)
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }
  const imageUrl =
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1699889309/nextImpermanence_images/ixy3jtihoffobuvdzy2j.jpg'
  return (
    <div>
      <div className={styles.english} onClick={toggleLanguage}>
        {isEnglish ? 'English' : 'French'}
      </div>

      {isEnglish ? (
        <div>
          <div className="w-[50%]">
            <h1 className={styles.AboutTitle}>à propos d’impermanence films</h1>

            <p className={styles.AboutText}>
              Basée à Paris depuis 2011, Impermanence Films est une structure
              œuvrant pour la production, la diffusion et la programmation du
              cinéma documentaire, privilégiant les regards à hauteur humaine et
              les films produits dans un contexte de liberté formelle. En
              soutien aux oeuvres indépendantes, Impermanence Films mutualise et
              met à disposition des outils de production et de diffusion.
            </p>
            <div
              style={{ position: 'relative' }}
              className="w-full aspect-video my-10"
            >
              <Image
                src={imageUrl}
                alt="aboutImage"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="w-full flex gap-10 flex-wrap justify-between">
            <p className={`w-[45%] ${styles.AboutText}`}>
              Impermanence Films soutient essentiellement des documentaires et
              des films essais, autoproductions, films d’artistes, oeuvres
              collectives… Son apport à la production permet à l’auteur de
              garder le plein contrôle éditorial, et son soutien à la
              distribution aide la visibilité du film grâce au réseau et aux
              plateformes d’Impermanence. Les oeuvres accompagnées par
              Impermanence Films, tant à la production qu’à la distribution, ont
              été diffusées et primées dans les festivals internationaux,
              diffusées en salle et à la télévision. En 2022-2023, les activités
              de production ont pris de l’essor et la distribution continue.
              Dans chaque domaine, le soutien proposé s’adapte aux besoins de
              chaque film. À l’origine du projet Impermanence, Les Rencontres
              Siréales ont réuni annuellement entre 2005 et 2008, des
              plasticiennes et réalisatrices autour des créations collectives et
              de la diffusion de leur travail, avec un esprit revendicateur pour
              plus de place des femmes dans la création visuelle et pour la
              production indépendante.
            </p>
            <p className={`w-[45%] ${styles.AboutText}`}>
              Dans la continuité des Rencontres Siréales, un travail associatif
              de programmation -le premier projet d’Impermanence- a été
              accueilli en résidence dans une friche culturelle de la région
              parisienne, Anis Gras le lieu de l’autre. De nombreux collectifs
              se sont associés au projet, pour des propositions mêlant art
              contemporain et cinéma. Aujourd’hui, l’esprit de collectif et
              d’entraide perdure parmi les auteur.rices-réalisateur.rices
              gravitant autour d’Impermanence Films. Des projets collaboratifs
              autour d’artistes sont actuellement en production et une reprise
              des Rencontres Siréales est prévue pour 2024.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-[50%]">
            <h1 className={styles.AboutTitle}>About impermanence films</h1>

            <p className={styles.AboutText}>
              Based in Paris since 2011, Impermanence Films is a structure
              dedicated to the production, distribution, and programming of
              documentary cinema, favoring perspectives at human eye level and
              films produced in a context of formal freedom. In support of
              independent works, Impermanence Films consolidates and provides
              tools for production and distribution.
            </p>
            <div
              style={{ position: 'relative' }}
              className="w-full aspect-video my-10"
            >
              <Image
                src={imageUrl}
                alt="aboutImage"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="w-full flex gap-10 flex-wrap justify-between">
            <p className={`w-[45%] ${styles.AboutText}`}>
              Impermanence Films primarily supports documentaries and
              experimental films, self-productions, artist films, collective
              works, etc. Its contribution to production allows the author to
              retain full editorial control, and its distribution support
              enhances the film's visibility through Impermanence's network and
              platforms. Works accompanied by Impermanence Films, both in
              production and distribution, have been screened and awarded at
              international festivals, shown in theaters, and on television. In
              2022-2023, production activities have flourished, and distribution
              continues. In each domain, the offered support adapts to the needs
              of each film.
            </p>
            <p className={`w-[45%] ${styles.AboutText}`}>
              At the origin of the Impermanence project, Les Rencontres Siréales
              annually brought together visual artists and female filmmakers
              between 2005 and 2008, focusing on collective creations and the
              dissemination of their work, with a claim for more space for women
              in visual creation and independent production. Following Les
              Rencontres Siréales, an associative programming project—the first
              project of Impermanence—was welcomed in residence in a cultural
              wasteland in the Parisian region, Anis Gras le lieu de l'autre.
              Numerous collectives joined the project, proposing collaborations
              between contemporary art and cinema. Today, the spirit of
              collective effort persists among author-directors orbiting
              Impermanence Films. Collaborative projects involving artists are
              currently in production, and a revival of Les Rencontres Siréales
              is planned for 2024.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutPage
