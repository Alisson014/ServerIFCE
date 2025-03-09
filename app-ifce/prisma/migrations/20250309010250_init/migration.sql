-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "turma" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor" (
    "id" SERIAL NOT NULL,
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletim" (
    "id" SERIAL NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "arte_n4" DOUBLE PRECISION NOT NULL,
    "arte_n3" DOUBLE PRECISION NOT NULL,
    "arte_n2" DOUBLE PRECISION NOT NULL,
    "arte_n1" DOUBLE PRECISION NOT NULL,
    "biologia_n4" DOUBLE PRECISION NOT NULL,
    "biologia_n3" DOUBLE PRECISION NOT NULL,
    "biologia_n2" DOUBLE PRECISION NOT NULL,
    "biologia_n1" DOUBLE PRECISION NOT NULL,
    "ed_fisica_n4" DOUBLE PRECISION NOT NULL,
    "ed_fisica_n3" DOUBLE PRECISION NOT NULL,
    "ed_fisica_n2" DOUBLE PRECISION NOT NULL,
    "ed_fisica_n1" DOUBLE PRECISION NOT NULL,
    "filosofia_n4" DOUBLE PRECISION NOT NULL,
    "filosofia_n3" DOUBLE PRECISION NOT NULL,
    "filosofia_n2" DOUBLE PRECISION NOT NULL,
    "filosofia_n1" DOUBLE PRECISION NOT NULL,
    "fisica_n4" DOUBLE PRECISION NOT NULL,
    "fisica_n3" DOUBLE PRECISION NOT NULL,
    "fisica_n2" DOUBLE PRECISION NOT NULL,
    "fisica_n1" DOUBLE PRECISION NOT NULL,
    "geografia_n4" DOUBLE PRECISION NOT NULL,
    "geografia_n3" DOUBLE PRECISION NOT NULL,
    "geografia_n2" DOUBLE PRECISION NOT NULL,
    "geografia_n1" DOUBLE PRECISION NOT NULL,
    "historia_n4" DOUBLE PRECISION NOT NULL,
    "historia_n3" DOUBLE PRECISION NOT NULL,
    "historia_n2" DOUBLE PRECISION NOT NULL,
    "historia_n1" DOUBLE PRECISION NOT NULL,
    "ingles_n4" DOUBLE PRECISION NOT NULL,
    "ingles_n3" DOUBLE PRECISION NOT NULL,
    "ingles_n2" DOUBLE PRECISION NOT NULL,
    "ingles_n1" DOUBLE PRECISION NOT NULL,
    "matematica_n4" DOUBLE PRECISION NOT NULL,
    "matematica_n3" DOUBLE PRECISION NOT NULL,
    "matematica_n2" DOUBLE PRECISION NOT NULL,
    "matematica_n1" DOUBLE PRECISION NOT NULL,
    "portugues_n4" DOUBLE PRECISION NOT NULL,
    "portugues_n3" DOUBLE PRECISION NOT NULL,
    "portugues_n2" DOUBLE PRECISION NOT NULL,
    "portugues_n1" DOUBLE PRECISION NOT NULL,
    "sociologia_n2" DOUBLE PRECISION NOT NULL,
    "sociologia_n1" DOUBLE PRECISION NOT NULL,
    "sociologia_n3" DOUBLE PRECISION NOT NULL,
    "sociologia_n4" DOUBLE PRECISION NOT NULL,
    "quimica_n4" DOUBLE PRECISION NOT NULL,
    "quimica_n3" DOUBLE PRECISION NOT NULL,
    "quimica_n2" DOUBLE PRECISION NOT NULL,
    "quimica_n1" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "boletim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_matricula_key" ON "aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professor_matricula_key" ON "professor"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "boletim_aluno_id_key" ON "boletim"("aluno_id");

-- AddForeignKey
ALTER TABLE "boletim" ADD CONSTRAINT "boletim_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
