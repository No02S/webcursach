import Uptitle from "@/lib/basecomponents/uptitle/uptitle";
import Image from "next/image";
import '../details.scss';
import Ratingbar from "@/lib/basecomponents/raitingbar/ratingbar";
import {notFound} from "next/navigation";
import Addtofav from "@/lib/basecomponents/addtofav/addtofav";
import GET_DATA from "@/lib/GETDATA/GET_DATA";

export default async function Details({params}) {
    const data = await GET_DATA({
        controller: 'catalog',
        action: 'cart-detail?article=' + params.details
    });

    if (!data || typeof (data) !== 'object' || data.title === undefined) {
        return notFound();
    }

    return (
        <section className="Details">
            <div className="container">
                <Uptitle full><h1 className="title">{data.title}</h1></Uptitle>

                <div className="Details__split">
                    <Ratingbar rating={data.rating} voices={data.voices} userrating={data.userrating} id={data.id}
                               id2={data.image}/>
                    <div className="Details__split__p"><Addtofav id={data.id} title={data.title} article={data.article}
                                                                 image={data.image}/>{data.city}</div>
                </div>
                <Image
                    src={"/img/" + data.image}
                    alt="image"
                    className="Details__image"
                    width={0}
                    height={0}
                    sizes='100vw'
                    priority={true}
                    quality={100}
                />
                <div className="Details__text">{data.text}</div>
            </div>
        </section>
    )
}