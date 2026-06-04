--
-- PostgreSQL database dump
--

\restrict 9GAIqikShKbPCRQc33M2CBHZqPiZczK2QEyJ0Vr5OJSb5gOMIizndkcY29r8Ada

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ExtinguisherStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ExtinguisherStatus" AS ENUM (
    'ACTIVE',
    'EXPIRED',
    'NEEDS_MAINTENANCE',
    'OUT_OF_SERVICE'
);


--
-- Name: ExtinguisherType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ExtinguisherType" AS ENUM (
    'WATER',
    'CO2',
    'FOAM',
    'DRY_CHEMICAL'
);


--
-- Name: InspectionStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."InspectionStatus" AS ENUM (
    'SCHEDULED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'OVERDUE',
    'PENDING',
    'APPROVED'
);


--
-- Name: MaintenanceCondition; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MaintenanceCondition" AS ENUM (
    'GOOD',
    'FAIR',
    'POOR',
    'DAMAGED',
    'NEEDS_REPLACEMENT'
);


--
-- Name: NotificationChannel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationChannel" AS ENUM (
    'EMAIL',
    'SYSTEM'
);


--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationType" AS ENUM (
    'INSPECTION_SCHEDULED',
    'INSPECTION_REMINDER',
    'EXPIRY_WARNING',
    'MAINTENANCE_LOGGED',
    'ACCOUNT'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'INSPECTOR',
    'USER'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: fire_extinguishers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fire_extinguishers (
    id text NOT NULL,
    "serialNumber" text NOT NULL,
    location text NOT NULL,
    type public."ExtinguisherType" NOT NULL,
    size text NOT NULL,
    "installationDate" timestamp(3) without time zone NOT NULL,
    "expiryDate" timestamp(3) without time zone NOT NULL,
    status public."ExtinguisherStatus" DEFAULT 'ACTIVE'::public."ExtinguisherStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "ownerId" text
);


--
-- Name: inspections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inspections (
    id text NOT NULL,
    "extinguisherId" text NOT NULL,
    "scheduledById" text NOT NULL,
    "inspectorId" text,
    "scheduledAt" timestamp(3) without time zone NOT NULL,
    status public."InspectionStatus" DEFAULT 'SCHEDULED'::public."InspectionStatus" NOT NULL,
    result text,
    notes text,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: maintenance_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.maintenance_logs (
    id text NOT NULL,
    "extinguisherId" text NOT NULL,
    "inspectorId" text NOT NULL,
    "inspectionId" text,
    "actionsTaken" text NOT NULL,
    "conditionNoted" public."MaintenanceCondition" NOT NULL,
    "actionDate" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    "userId" text NOT NULL,
    "extinguisherId" text,
    type public."NotificationType" NOT NULL,
    channel public."NotificationChannel" DEFAULT 'SYSTEM'::public."NotificationChannel" NOT NULL,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "sentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "resetToken" text,
    "resetTokenExpiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4bb1faf9-aefd-4e40-8f1f-cf0eb48f41d0	7f1437a6935668eb958f80242e93ab479401f4218a5000af76356907220b5d8a	2026-06-03 08:39:02.711463+01	20260603000000_fems_srs	\N	\N	2026-06-03 08:39:02.669134+01	1
32ddfd5c-30ac-4c91-b45d-8c8f2b22b507	73751b4bb11896e324853ab4f2e2852effbea7215c81ea6dcf4b0e6ee89f598f	2026-06-03 10:22:24.366113+01	20260603000001_owner_and_pending		\N	2026-06-03 10:22:24.366113+01	0
\.


--
-- Data for Name: fire_extinguishers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fire_extinguishers (id, "serialNumber", location, type, size, "installationDate", "expiryDate", status, "createdAt", "updatedAt", "ownerId") FROM stdin;
e6f6c6e6-6c49-42a3-bb08-28087128c41b	FE-0006	Building B — Floor 2 Lab	CO2	5lbs	2025-08-02 10:17:39.204	2026-05-19 10:17:39.204	EXPIRED	2025-08-02 12:17:39.204	2026-06-03 10:17:39.205	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40
aa10e026-d25b-406b-8f9c-3e60f7f69668	FE-0007	Building C — Basement	FOAM	9lbs	2025-08-29 10:17:39.207	2027-01-11 10:17:39.207	NEEDS_MAINTENANCE	2025-08-29 12:17:39.207	2026-06-03 10:17:39.209	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40
04fcd687-b379-41ff-8d4a-d7a98723d11a	FE-0008	Building C — Floor 1 Reception	DRY_CHEMICAL	12lbs	2025-08-26 10:17:39.211	2027-01-18 10:17:39.211	OUT_OF_SERVICE	2025-08-26 12:17:39.211	2026-06-03 10:17:39.212	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40
6edb566f-7b9b-4638-9703-1723f1e8144d	FE-0011	Warehouse 1 — Bay A	FOAM	9lbs	2025-10-31 10:17:39.218	2027-02-08 10:17:39.218	ACTIVE	2025-10-31 12:17:39.218	2026-06-03 10:17:39.218	c6fe11f4-08bd-4b9e-911c-853eb2232d03
988e3a3d-c631-4261-b627-f8268dc646a0	FE-0012	Warehouse 2 — Loading Dock	DRY_CHEMICAL	12lbs	2025-10-28 10:17:39.219	2027-02-15 10:17:39.219	ACTIVE	2025-10-28 12:17:39.219	2026-06-03 10:17:39.219	c6fe11f4-08bd-4b9e-911c-853eb2232d03
df176a5e-a31b-40aa-a90c-eb7c52190806	FE-0013	Car Park Level 1	WATER	2.5lbs	2025-11-24 10:17:39.22	2027-02-22 10:17:39.22	ACTIVE	2025-11-24 12:17:39.22	2026-06-03 10:17:39.22	c6fe11f4-08bd-4b9e-911c-853eb2232d03
2512ec94-964e-4039-be8c-dc7bc3d1baf4	FE-0014	Car Park Level 2	CO2	5lbs	2025-11-21 10:17:39.222	2026-05-11 10:17:39.222	EXPIRED	2025-11-21 12:17:39.222	2026-06-03 10:17:39.222	c6fe11f4-08bd-4b9e-911c-853eb2232d03
00382ed1-ba7f-4e64-8c15-2ec0a4d1cac4	FE-0015	Data Centre — Row 3	FOAM	9lbs	2025-12-18 10:17:39.223	2027-03-08 10:17:39.223	NEEDS_MAINTENANCE	2025-12-18 12:17:39.223	2026-06-03 10:17:39.224	\N
dfe51195-4c8c-46ad-a2d1-56f8d994cbf9	FE-0016	Canteen	DRY_CHEMICAL	12lbs	2025-12-30 10:17:39.225	2027-03-15 10:17:39.225	OUT_OF_SERVICE	2025-12-30 12:17:39.225	2026-06-03 10:17:39.227	\N
080a2059-4cc0-4777-8443-f9bdc0e984dd	FE-0017	Generator Room	WATER	2.5lbs	2026-01-26 10:17:39.228	2027-03-22 10:17:39.228	ACTIVE	2026-01-26 12:17:39.228	2026-06-03 10:17:39.23	\N
8a03b86c-5202-47c4-b0d4-ff4c1e81dd6e	FE-0018	Chemical Store	CO2	5lbs	2026-01-23 10:17:39.232	2027-03-29 10:17:39.232	ACTIVE	2026-01-23 12:17:39.232	2026-06-03 10:17:39.233	\N
7036d830-d94b-4915-9e18-6c27eb3358ec	FE-0019	Security Post	FOAM	9lbs	2026-02-19 10:17:39.234	2027-04-05 10:17:39.234	ACTIVE	2026-02-19 12:17:39.234	2026-06-03 10:17:39.235	\N
e9fc4fd0-d1cf-47b2-8295-e7be7ca32e92	FE-0020	Roof Plant Room	DRY_CHEMICAL	12lbs	2026-02-16 10:17:39.236	2027-04-12 10:17:39.236	ACTIVE	2026-02-16 12:17:39.236	2026-06-03 10:17:39.237	\N
30927214-5047-405e-9241-725e35c5dbd5	FE-0021	Building D — Floor 1	WATER	2.5lbs	2026-03-30 10:17:39.238	2027-04-19 10:17:39.238	ACTIVE	2026-03-30 12:17:39.238	2026-06-03 10:17:39.238	\N
188a5bbd-08b1-4aff-9705-eef798718c4c	FE-0022	Building D — Floor 2	CO2	5lbs	2026-03-27 10:17:39.239	2026-05-23 10:17:39.239	EXPIRED	2026-03-27 12:17:39.239	2026-06-03 10:17:39.24	\N
1c03e148-2462-4616-ad95-8c430e6b7963	FE-37292	Basement	FOAM	12lbs	2026-06-04 00:00:00	2026-06-25 00:00:00	ACTIVE	2026-06-04 10:27:53.813	2026-06-04 10:29:20.025	b41fe2e8-e263-4301-a82d-dea0e1570706
\.


--
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inspections (id, "extinguisherId", "scheduledById", "inspectorId", "scheduledAt", status, result, notes, "completedAt", "createdAt", "updatedAt") FROM stdin;
be071100-d1f4-428e-bd59-311f6e02483b	aa10e026-d25b-406b-8f9c-3e60f7f69668	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-06-10 10:17:39.272	SCHEDULED	\N	\N	\N	2026-06-03 10:17:39.272	2026-06-03 10:17:39.272
b335223c-d6f4-4fea-974c-f72ee0f97864	04fcd687-b379-41ff-8d4a-d7a98723d11a	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2025-09-26 10:17:39.273	PENDING	\N	\N	\N	2026-06-03 10:17:39.274	2026-06-03 10:17:39.274
84603b91-fdae-4736-b162-7ae3c4046568	6edb566f-7b9b-4638-9703-1723f1e8144d	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2025-12-05 10:17:39.28	COMPLETED	PASS_WITH_NOTES	Inspection completed — ref #11	2025-12-05 12:17:39.28	2026-06-03 10:17:39.281	2026-06-03 10:17:39.281
917f1247-8ae3-4d6c-a61c-9f4f331e7fbb	988e3a3d-c631-4261-b627-f8268dc646a0	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2025-11-26 10:17:39.282	COMPLETED	PASS	Inspection completed — ref #12	2025-11-26 12:17:39.282	2026-06-03 10:17:39.282	2026-06-03 10:17:39.282
e5815c31-7c09-4d1f-822f-1ae5e2e4764d	df176a5e-a31b-40aa-a90c-eb7c52190806	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2025-11-17 10:17:39.283	COMPLETED	FAIL	Inspection completed — ref #13	2025-11-17 12:17:39.283	2026-06-03 10:17:39.283	2026-06-03 10:17:39.283
67cdfad7-47ff-4df7-8158-336e5587dbc1	2512ec94-964e-4039-be8c-dc7bc3d1baf4	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-01-01 10:17:39.284	COMPLETED	PASS_WITH_NOTES	Inspection completed — ref #14	2026-01-01 12:17:39.284	2026-06-03 10:17:39.284	2026-06-03 10:17:39.284
dd40125b-d863-4a75-8cca-22bf1acd013e	00382ed1-ba7f-4e64-8c15-2ec0a4d1cac4	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2025-12-23 10:17:39.286	COMPLETED	PASS	Inspection completed — ref #15	2025-12-23 12:17:39.286	2026-06-03 10:17:39.286	2026-06-03 10:17:39.286
384bb842-fc9f-4e27-9550-d75e799966d0	dfe51195-4c8c-46ad-a2d1-56f8d994cbf9	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-06-20 10:17:39.287	SCHEDULED	\N	\N	\N	2026-06-03 10:17:39.287	2026-06-03 10:17:39.287
01c399c7-fd4f-413d-9825-9dbe2192dd77	080a2059-4cc0-4777-8443-f9bdc0e984dd	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-06-10 10:17:39.287	SCHEDULED	\N	\N	\N	2026-06-03 10:17:39.288	2026-06-03 10:17:39.288
d36fe89d-2d55-4acc-952b-e1d193a6efad	8a03b86c-5202-47c4-b0d4-ff4c1e81dd6e	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-01-24 10:17:39.288	PENDING	\N	\N	\N	2026-06-03 10:17:39.288	2026-06-03 10:17:39.288
c1d7580a-1198-4a1f-aa74-4de244d6caed	7036d830-d94b-4915-9e18-6c27eb3358ec	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-01-15 10:17:39.289	PENDING	\N	\N	\N	2026-06-03 10:17:39.289	2026-06-03 10:17:39.289
c0c18cba-fe40-4dd9-a67f-3cd8c3e6a772	e9fc4fd0-d1cf-47b2-8295-e7be7ca32e92	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-03-01 10:17:39.29	CANCELLED	\N	\N	\N	2026-06-03 10:17:39.29	2026-06-03 10:17:39.29
f743919d-95e7-409b-a4f5-783030be220a	30927214-5047-405e-9241-725e35c5dbd5	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-02-25 10:17:39.29	COMPLETED	PASS	Inspection completed — ref #21	2026-02-25 12:17:39.29	2026-06-03 10:17:39.29	2026-06-03 10:17:39.29
84ab548c-84d7-4cae-810d-99335a9e8960	188a5bbd-08b1-4aff-9705-eef798718c4c	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-02-16 10:17:39.291	COMPLETED	FAIL	Inspection completed — ref #22	2026-02-16 12:17:39.291	2026-06-03 10:17:39.292	2026-06-03 10:17:39.292
5ec0a0ae-ad49-495d-a729-29c10300627a	aa10e026-d25b-406b-8f9c-3e60f7f69668	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-05-18 10:17:39.299	COMPLETED	FAIL	Inspection completed — ref #31	2026-05-18 12:17:39.299	2026-06-03 10:17:39.299	2026-06-03 10:17:39.299
66721af1-5569-445d-9736-2dc4a7c881bc	e6f6c6e6-6c49-42a3-bb08-28087128c41b	67e4acd9-e7d0-4a7c-a6eb-e775aa281d40	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-06-15 10:17:39.271	COMPLETED	FAIL	it is out of service	2026-06-03 11:32:41.38	2026-06-03 10:17:39.271	2026-06-03 11:32:41.381
5f39acd2-dc55-4d9e-96a6-9ac97b16d3fc	1c03e148-2462-4616-ad95-8c430e6b7963	54ec1879-cb77-4b83-bef7-58f4bc294595	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	2026-06-18 13:32:00	SCHEDULED	PASS	check it out	\N	2026-06-04 10:29:47.776	2026-06-04 10:31:07.81
\.


--
-- Data for Name: maintenance_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.maintenance_logs (id, "extinguisherId", "inspectorId", "inspectionId", "actionsTaken", "conditionNoted", "actionDate", "createdAt") FROM stdin;
e45a0deb-bed7-4446-9a10-15cf2c5b17b4	aa10e026-d25b-406b-8f9c-3e60f7f69668	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Annual service — replaced O-ring seals and reweighed cylinder.	GOOD	2026-04-26 10:17:39.303	2026-06-03 10:17:39.303
814b52ae-ea82-40ef-a7cd-62243f10c902	df176a5e-a31b-40aa-a90c-eb7c52190806	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Full hydrostatic test completed; passed.	FAIR	2026-03-19 10:17:39.307	2026-06-03 10:17:39.307
df432ae6-9105-4c18-b57e-98284f59e9e0	dfe51195-4c8c-46ad-a2d1-56f8d994cbf9	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Replaced discharge head and safety valve.	POOR	2026-02-28 10:17:39.309	2026-06-03 10:17:39.31
72c16d53-7f61-4892-a8fc-d6e37d4a46a8	7036d830-d94b-4915-9e18-6c27eb3358ec	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Refilled agent after discharge test.	DAMAGED	2026-02-09 10:17:39.312	2026-06-03 10:17:39.313
c1fcbded-1637-49d9-9ac5-b9eb3764c126	188a5bbd-08b1-4aff-9705-eef798718c4c	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Label and tamper seal replaced; location updated.	GOOD	2026-01-29 10:17:39.314	2026-06-03 10:17:39.314
060ee7be-f49a-4854-a1c1-4edcca496ecc	aa10e026-d25b-406b-8f9c-3e60f7f69668	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Anti-tamper tag refreshed; inspection label updated.	FAIR	2025-12-02 10:17:39.316	2026-06-03 10:17:39.316
9316fc38-6465-44f5-8948-9335cc746965	df176a5e-a31b-40aa-a90c-eb7c52190806	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	e5815c31-7c09-4d1f-822f-1ae5e2e4764d	Replaced hose assembly — original showed cracking.	POOR	2025-10-25 10:17:39.318	2026-06-03 10:17:39.318
a3602c25-adaa-404b-a16a-323fc541ae1b	dfe51195-4c8c-46ad-a2d1-56f8d994cbf9	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Pressure gauge replaced — reading was outside tolerance.	DAMAGED	2025-10-06 10:17:39.319	2026-06-03 10:17:39.319
2b32200d-9aab-434e-a177-a530acf0fe4c	7036d830-d94b-4915-9e18-6c27eb3358ec	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Full internal inspection; cylinder recoated.	GOOD	2025-09-25 10:17:39.32	2026-06-03 10:17:39.32
7c0f8bc7-110a-4be1-b966-d9e99da029ca	188a5bbd-08b1-4aff-9705-eef798718c4c	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Replaced safety pin; gauge pressure nominal.	GOOD	2025-09-05 10:17:39.323	2026-06-03 10:17:39.323
0a1cf589-a277-4e8a-970a-b4c0b6807006	aa10e026-d25b-406b-8f9c-3e60f7f69668	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	\N	Minor corrosion on bracket — treated and repainted.	FAIR	2025-07-10 10:17:39.325	2026-06-03 10:17:39.325
7e6213d5-f6fb-4fd7-8be1-5a9dc09c5476	1c03e148-2462-4616-ad95-8c430e6b7963	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	5ec0a0ae-ad49-495d-a729-29c10300627a	fixed the pressure gauge	GOOD	2026-06-18 00:00:00	2026-06-04 10:31:53.22
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, "userId", "extinguisherId", type, channel, message, "isRead", "sentAt") FROM stdin;
85a76adf-998a-4d14-b003-b901d0c0902a	54ec1879-cb77-4b83-bef7-58f4bc294595	1c03e148-2462-4616-ad95-8c430e6b7963	MAINTENANCE_LOGGED	SYSTEM	Maintenance logged for extinguisher FE-37292 (Basement): fixed the pressure gauge — condition GOOD.	f	2026-06-04 10:31:53.243
f60e0f2a-38ce-4d2b-ba96-3d53d9f60060	54ec1879-cb77-4b83-bef7-58f4bc294595	1c03e148-2462-4616-ad95-8c430e6b7963	MAINTENANCE_LOGGED	EMAIL	Maintenance logged for extinguisher FE-37292 (Basement): fixed the pressure gauge — condition GOOD.	f	2026-06-04 10:31:53.248
8852b771-e5fd-449a-b82d-42557f05c1d2	b41fe2e8-e263-4301-a82d-dea0e1570706	\N	INSPECTION_SCHEDULED	EMAIL	Your inspection request for New (City Towel) has been submitted and is pending review.	f	2026-06-03 11:03:23.207
e2dee97d-6b12-4614-b54b-ac912c28c340	54ec1879-cb77-4b83-bef7-58f4bc294595	\N	INSPECTION_SCHEDULED	EMAIL	Inspection scheduled for extinguisher New (City Towel) on 2026-06-03T15:06:00.000Z.	t	2026-06-03 11:03:26.796
45b2ce27-3f15-42c6-a027-496dfd66c88e	54ec1879-cb77-4b83-bef7-58f4bc294595	\N	INSPECTION_SCHEDULED	SYSTEM	Inspection scheduled for extinguisher New (City Towel) on 2026-06-03T15:06:00.000Z.	t	2026-06-03 11:03:26.79
244049e3-ac99-4334-8be6-81758b3ceb7e	b41fe2e8-e263-4301-a82d-dea0e1570706	\N	INSPECTION_SCHEDULED	SYSTEM	Your inspection request for New (City Towel) has been submitted and is pending review.	t	2026-06-03 11:03:23.204
57c35fbe-fa4e-41a9-b2bc-513e30b15d59	54ec1879-cb77-4b83-bef7-58f4bc294595	1c03e148-2462-4616-ad95-8c430e6b7963	INSPECTION_SCHEDULED	SYSTEM	Inspection scheduled for extinguisher FE-37292 (Basement) on 2026-06-18T13:32:00.000Z.	f	2026-06-04 10:29:52.33
a99706f4-c14d-4dbb-96d8-e9558eeb27a2	54ec1879-cb77-4b83-bef7-58f4bc294595	1c03e148-2462-4616-ad95-8c430e6b7963	INSPECTION_SCHEDULED	EMAIL	Inspection scheduled for extinguisher FE-37292 (Basement) on 2026-06-18T13:32:00.000Z.	f	2026-06-04 10:29:52.342
d7ccecf2-1350-481c-8eb2-5a7b63b2455c	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	1c03e148-2462-4616-ad95-8c430e6b7963	INSPECTION_SCHEDULED	SYSTEM	You have been assigned an inspection for extinguisher FE-37292 (Basement) on 2026-06-18T13:32:00.000Z.	t	2026-06-04 10:29:47.79
c8ba43fc-8602-4014-a674-f904dad4d37e	30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	1c03e148-2462-4616-ad95-8c430e6b7963	INSPECTION_SCHEDULED	EMAIL	You have been assigned an inspection for extinguisher FE-37292 (Basement) on 2026-06-18T13:32:00.000Z.	t	2026-06-04 10:29:47.795
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "firstName", "lastName", email, "passwordHash", role, "isActive", "resetToken", "resetTokenExpiresAt", "createdAt", "updatedAt") FROM stdin;
54ec1879-cb77-4b83-bef7-58f4bc294595	System	Admin	admin@tzw.com	$2b$10$j5XdPqY9P74mavOOLSlBYeqv2tMPYVrdwIVIThMf3zL/.0mZi0YeS	ADMIN	t	\N	\N	2026-06-03 07:39:15.128	2026-06-03 07:39:15.128
30d117ee-29c5-495d-8a0c-fa5a0ecaaf5c	Ingrid	Inspector	inspector@tzw.com	$2b$10$fCFxGQqjFNO3QiOqHVcbwuZ8bKVw0teS3PA/J0IHHyiqmcWcEQQ9i	INSPECTOR	t	\N	\N	2026-06-03 07:39:15.141	2026-06-03 07:39:15.141
67e4acd9-e7d0-4a7c-a6eb-e775aa281d40	Uma	User	user@tzw.com	$2b$10$fAtl4erlX2nMs0MebyGwru6e5wucAjS8zxSep4o4wGI.y5kY7Ungy	USER	t	\N	\N	2026-06-03 07:39:15.144	2026-06-03 07:39:15.144
c6fe11f4-08bd-4b9e-911c-853eb2232d03	Boris	User	user2@tzw.com	$2b$10$LtQY5DYeawsZcun.yOPveOSghdlSI4KxL2sptmO5tr4ob3nKj93/2	USER	t	\N	\N	2026-06-03 10:16:29.711	2026-06-03 11:41:54.759
b41fe2e8-e263-4301-a82d-dea0e1570706	Ndahiro	Loicke	ndahiroloicke@gmail.com	$2b$10$R1/HdjfoKmvJ41MI.kadBuREK/6kozCeq8CFOcQRHOkFEq4Bvp5Pe	USER	t	6866b5a1-e66e-456c-b8e5-dfa32c4c4b41	2026-06-04 11:15:45.088	2026-06-03 07:48:50.38	2026-06-04 10:15:45.088
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: fire_extinguishers fire_extinguishers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fire_extinguishers
    ADD CONSTRAINT fire_extinguishers_pkey PRIMARY KEY (id);


--
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (id);


--
-- Name: maintenance_logs maintenance_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT maintenance_logs_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fire_extinguishers_serialNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "fire_extinguishers_serialNumber_key" ON public.fire_extinguishers USING btree ("serialNumber");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: fire_extinguishers fire_extinguishers_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fire_extinguishers
    ADD CONSTRAINT "fire_extinguishers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: inspections inspections_extinguisherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT "inspections_extinguisherId_fkey" FOREIGN KEY ("extinguisherId") REFERENCES public.fire_extinguishers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inspections inspections_inspectorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT "inspections_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: inspections inspections_scheduledById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT "inspections_scheduledById_fkey" FOREIGN KEY ("scheduledById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance_logs maintenance_logs_extinguisherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT "maintenance_logs_extinguisherId_fkey" FOREIGN KEY ("extinguisherId") REFERENCES public.fire_extinguishers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: maintenance_logs maintenance_logs_inspectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT "maintenance_logs_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES public.inspections(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: maintenance_logs maintenance_logs_inspectorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT "maintenance_logs_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_extinguisherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_extinguisherId_fkey" FOREIGN KEY ("extinguisherId") REFERENCES public.fire_extinguishers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 9GAIqikShKbPCRQc33M2CBHZqPiZczK2QEyJ0Vr5OJSb5gOMIizndkcY29r8Ada

