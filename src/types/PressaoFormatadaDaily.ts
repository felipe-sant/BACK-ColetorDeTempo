type PressaoFormatadaDaily = {
    hour: number;
    data: {
        maxPressao: number;
        minPressao: number;
        mediaPressao: number;
        numeroDeLeituras: number;
    };
}

export default PressaoFormatadaDaily;