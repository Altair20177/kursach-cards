ALTER TABLE IF EXISTS public.cards
    ADD COLUMN "isFree" boolean;

ALTER TABLE IF EXISTS public.cards
    ADD COLUMN "price" numeric;
