import Payment from "../../../components/modals/Payment";


export default function PlatformPage() {


    return (
        <div className="flex flex-col gap-20 w-full mx-auto container items-center justify-center">
            <h1>Profile Page</h1>

            <Payment username="teste" />
        </div>
    )
}
