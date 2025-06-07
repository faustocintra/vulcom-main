import { z } from "zod";

// Lista de cores permitidas
const cores = [
    "AMARELO",
    "AZUL",
    "BRANCO",
    "CINZA",
    "DOURADO",
    "LARANJA",
    "MARROM",
    "PRATA",
    "PRETO",
    "ROSA",
    "ROXO",
    "VERDE",
    "VERMELHO",
];

// Ano atual para validação do ano de fabricação
const currentYear = new Date().getFullYear();

const Car = z.object({
    brand: z
        .string()
        .min(1, { message: "A Marca deve ter, no mínimo, 1 caractere." })
        .max(25, { message: "A Marca deve ter, no máximo, 25 caracteres." }),
    model: z
        .string()
        .min(1, { message: "O Modelo deve ter, no mínimo, 1 caractere." })
        .max(25, { message: "O Modelo deve ter, no máximo, 25 caracteres." }),
    color: z.enum(cores, {
        message: "Cor inválida. Deve ser uma das cores permitidas.",
    }),
    year_manufacture: z
        .number()
        .int()
        .gte(1960, { message: "O ano deve ser maior ou igual a 1960" })
        .lte(currentYear, {
            message: `O ano deve ser menor ou igual a ${currentYear}.`,
        }),
    imported: z.boolean({
        message: "O campo 'imported' deve ser um booleano.",
    }),
    plates: z.string().length(8, {
        message: "A placa deve ter exatamente 8 caracteres.",
    }),
    selling_date: z.coerce
        .date()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                const minDate = new Date("2020-01-01");
                const maxDate = new Date();
                return val >= minDate && val <= maxDate;
            },
            {
                message:
                    "A data de venda deve estar entre 01/01/2020 e a data atual.",
            }
        ),
    selling_price: z
        .number()
        .gte(1000, { message: "O preco deve ser maior ou igual a 1000" })
        .lte(5000000, { message: "O preco deve ser menor ou igual a 5000000" })
        .optional(),
});

export default Car;
