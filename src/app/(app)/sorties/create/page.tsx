
'use client';

import CreateOutingForm from './CreateOutingForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateOutingPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/sorties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux sorties
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Créer une sortie</h1>
        <p className="text-muted-foreground">
          Tu as la gnac, vas-y crée ta sortie, remplis ton formulaire de description d'évènement :
        </p>
      </div>

      <CreateOutingForm />
    </div>
  );
}

    
