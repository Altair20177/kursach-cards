ALTER TABLE IF EXISTS public.cards
    ADD COLUMN "isFree" boolean;

ALTER TABLE IF EXISTS public.cards
    ADD COLUMN "price" numeric;

ALTER TABLE IF EXISTS public.organizations
    ADD COLUMN email character varying(255);