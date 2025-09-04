'use client'; // Indique que c'est un composant client

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation'; // C'est ici que le hook est utilisé

// Importations des composants UI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { outingCategories, sportSubCategories } from '../data';
import { ArrowLeft, CalendarIcon, Upload, ExternalLink } from 'lucide-react';
import { sortiesData, type Sortie } from '../data';

const allOutingsData: Sortie[] = sortiesData;

const currentUser = {
  role: 'admin' as 'user' | 'moderator' | 'admin',
};

const createOutingSchema = z.object({
  //... Ton schéma Zod existant
});

type CreateOutingFormData = z.infer<typeof createOutingSchema>;

export default function CreateOutingForm() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const form = useForm<CreateOutingFormData>({
        resolver: zodResolver(createOutingSchema),
        defaultValues: {
            participantCount: [20],
            canBeReplaced: false,
            isOnline: false,
            isHybrid: false,
            isFree: false,
            repeatEvent: false,
            allowGuests: false,
            isRecurring: false,
        }
    });

    useEffect(() => {
        const duplicateId = searchParams.get('duplicate');
        if (duplicateId) {
            const outingToDuplicate = allOutingsData.find(o => o.id === duplicateId);
            if (outingToDuplicate) {
                form.reset({
                    title: outingToDuplicate.title,
                    mainCategory: outingCategories.includes(outingToDuplicate.theme) ? outingToDuplicate.theme : undefined,
                    sportSubCategory: sportSubCategories.includes(outingToDuplicate.theme) ? outingToDuplicate.theme : undefined,
                    description: outingToDuplicate.description,
                    participantCount: [outingToDuplicate.maxParticipants],
                    locationName: outingToDuplicate.location,
                    locationAddress: outingToDuplicate.location,
                });
                toast({
                    title: "Sortie dupliquée",
                    description: "Les informations de la sortie ont été pré-remplies. N'oubliez pas de définir une nouvelle date et heure.",
                });
            }
        }
    }, [searchParams, form, toast]);

    const { watch, control, handleSubmit, formState: { errors } } = form;
    const watchMainCategory = watch('mainCategory');
    const watchIsRecurring = watch('isRecurring');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = (data: CreateOutingFormData) => {
        console.log("New outing created:", data);
        toast({
            title: "òsca !",
            description: "L'évènement a bien été créé ! Bon astre pour ta sortie !",
        });
    };

    const maxParticipants = currentUser.role === 'admin' || currentUser.role === 'moderator' ? 500 : 100;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* ... Tout le contenu de ton formulaire... */}
            {/* ... avec tous les contrôles, cartes, etc. */}
            <Card>
                <CardHeader>
                    <CardTitle>Informations principales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input id="title" {...form.register('title')} />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                    {/* ... Le reste des champs... */}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" size="lg">Créer l'évènement</Button>
            </div>
        </form>
    );
}
