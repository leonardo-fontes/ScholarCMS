export default function calcAmount(amount: number) {

    const threePercent: number = amount * 0.03;
    const recalculatedAmount: number = amount - threePercent;

    return {
        recalculatedAmount,
        threePercent
    };
}
