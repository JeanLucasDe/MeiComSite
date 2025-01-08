import styles from "./BoxTemplates.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import Themes from "../../Documents/Themes.json"
import { Link } from "react-router-dom";

export default function BoxTemplates () {
return (
    <>
    <div className={styles.container}>
        <div className={`${styles.row} row`}>
            <div className="col-2 order-2">
                <h1>Template</h1>
            </div>
            <div className="col-7">
                <div className="line"></div>
            </div>
        </div>
    <div
    className={styles.link}
    >
        <Swiper
            spaceBetween={10}
            className={styles.cont_slides}
            breakpoints={{
                320: {
                  width: 320,
                  slidesPerView: 1,
                },
                768: {
                    width: 768,
                    slidesPerView: 2,
                  },
              }}
            >
                {Themes.map(dados => {
                    return (
                            <SwiperSlide>
                                <div className={styles.box}>
                                    <div className={styles.cont_img}>
                                        <Link to={dados.link}><img src={dados.img}/></Link>
                                    </div>
                                    <p className={styles.name_template}>{dados.name}</p>
                                </div>
                            </SwiperSlide>
                        )
                })}
        </Swiper>
    </div>
    </div>
    </>
    )
}