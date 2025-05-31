import { z } from 'zod'

const colors = [
    'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO',
    'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA',
    'ROXO', 'VERDE', 'VERMELHO'
]

const currentYear = new Date().getFullYear()
const today = new Date()
const openingDate = new Date('2020-01-01')

const Cars = z.object({
    brand: z.string()
        .min(1, { message: 'A marca deve ter, no mínimo, 1 caractere.' })
        .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres.' }),

    model: z.string()
        .min(1, { message: 'O modelo deve ter, no mínimo, 1 caractere.' })
        .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres.' }),

    color: z.enum(colors, {
        errorMap: () => ({ message: 'Cor inválida. Escolha uma das cores disponíveis.' })
    }),

    year_manufacture: z.number()
        .min(1960, { message: 'Ano mínimo é 1960.' })
        .max(currentYear, { message: `Ano máximo é ${currentYear}.` }),

    imported: z.boolean({ required_error: 'Este campo deve ser verdadeiro ou falso.' }),

    plates: z.string()
        .length(8, { message: 'A placa deve ter exatamente 8 caracteres.' }),

    selling_date: z
        .preprocess(
            (arg) => arg ? new Date(String(arg)) : undefined,
            z.date()
                .min(openingDate, { message: 'A data de venda não pode ser anterior a 01/01/2020 (abertura da loja).' })
                .max(today, { message: 'A data de venda não pode ser no futuro.' })
        ).optional(),

    selling_price: z
        .number()
        .min(1000, { message: 'O valor mínimo é de R$ 1.000,00.' })
        .max(5000000, { message: 'O valor máximo é de R$ 5.000.000,00.' })
        .optional(),
})

export default Cars
