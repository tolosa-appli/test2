
// app/sorties/create/page.tsx
import { Suspense } from 'react';
import OutingForm from '@/components/OutingForm';

export default function CreatePage() {
  return (
    <div>
      <h1>Créer une sortie</h1>
      <Suspense fallback={<div>Chargement du formulaire...</div>}>
        <OutingForm />
      </Suspense>
    </div>
  );
}

    
