import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "zmp-ui";

const BookingFinish = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="e9Yjp3XycKs1"
        viewBox="0 -200 700 400"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n#e9Yjp3XycKs14_tr {animation: e9Yjp3XycKs14_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs14_tr__tr { 0% {transform: translate(1375.414001px,923.636321px) rotate(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: translate(1375.414001px,923.636321px) rotate(50deg)} 100% {transform: translate(1375.414001px,923.636321px) rotate(50deg)}} #e9Yjp3XycKs14_tk {animation: e9Yjp3XycKs14_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs14_tk__tk { 0% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: skewX(0deg) skewY(-30deg)} 100% {transform: skewX(0deg) skewY(-30deg)}} #e9Yjp3XycKs14_ts {animation: e9Yjp3XycKs14_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs14_ts__ts { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: scale(1,0.936644)} 100% {transform: scale(1,0.936644)}} #e9Yjp3XycKs18_tk {animation: e9Yjp3XycKs18_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs18_tk__tk { 0% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 100% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)}} #e9Yjp3XycKs18_ts {animation: e9Yjp3XycKs18_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs18_ts__ts { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: scale(1.3,1)} 100% {transform: scale(1.3,1)}} #e9Yjp3XycKs19_tk {animation: e9Yjp3XycKs19_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs19_tk__tk { 0% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 100% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)}} #e9Yjp3XycKs19_ts {animation: e9Yjp3XycKs19_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs19_ts__ts { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 12.5% {transform: scale(0.7,1)} 100% {transform: scale(0.7,1)}} #e9Yjp3XycKs25_to {animation: e9Yjp3XycKs25_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs25_to__to { 0% {transform: translate(780.484985px,532.785019px)} 17.5% {transform: translate(780.484985px,532.785019px);animation-timing-function: cubic-bezier(0,0,0.58,1)} 20% {transform: translate(780.484985px,541.28066px);animation-timing-function: cubic-bezier(0.42,0,0.515,1.31)} 27.5% {transform: translate(780.484985px,532.785019px)} 60% {transform: translate(780.484985px,532.785019px);animation-timing-function: cubic-bezier(0,0,0.58,1)} 62.5% {transform: translate(780.484985px,541.28066px);animation-timing-function: cubic-bezier(0.42,0,0.515,1.31)} 70% {transform: translate(780.484985px,532.785019px)} 100% {transform: translate(780.484985px,532.785019px)}} #e9Yjp3XycKs31_ts {animation: e9Yjp3XycKs31_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs31_ts__ts { 0% {transform: translate(758.12px,637.89px) scale(1,1)} 10% {transform: translate(758.12px,637.89px) scale(1,1);animation-timing-function: cubic-bezier(0.42,0,1,1)} 17.5% {transform: translate(758.12px,637.89px) scale(1,0.032395)} 55% {transform: translate(758.12px,637.89px) scale(1,0.032395);animation-timing-function: cubic-bezier(0.42,0,1,1)} 60% {transform: translate(758.12px,637.89px) scale(1,1)} 100% {transform: translate(758.12px,637.89px) scale(1,1)}} #e9Yjp3XycKs32_tk {animation: e9Yjp3XycKs32_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs32_tk__tk { 0% {transform: translate(758.12px,637.9px) skewX(0deg) skewY(0deg)} 10% {transform: translate(758.12px,637.9px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0,0,0.58,1)} 17.5% {transform: translate(758.12px,637.9px) skewX(40deg) skewY(0deg)} 55% {transform: translate(758.12px,637.9px) skewX(40deg) skewY(0deg);animation-timing-function: cubic-bezier(0.42,0,1,1)} 60% {transform: translate(758.12px,637.9px) skewX(0deg) skewY(0deg)} 100% {transform: translate(758.12px,637.9px) skewX(0deg) skewY(0deg)}} #e9Yjp3XycKs33 {animation: e9Yjp3XycKs33_c_o 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs33_c_o { 0% {opacity: 0} 15% {opacity: 0;animation-timing-function: step-end} 17.5% {opacity: 1} 55% {opacity: 1;animation-timing-function: step-start} 57.5% {opacity: 0} 100% {opacity: 0}} #e9Yjp3XycKs35_tr {animation: e9Yjp3XycKs35_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs35_tr__tr { 0% {transform: translate(904.38px,549.26px) rotate(90deg)} 60% {transform: translate(904.38px,549.26px) rotate(90deg)} 65% {transform: translate(904.38px,549.26px) rotate(180deg);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 80% {transform: translate(904.38px,549.26px) rotate(360deg)} 95% {transform: translate(904.38px,549.26px) rotate(360deg);animation-timing-function: cubic-bezier(0.42,0,1,1)} 100% {transform: translate(904.38px,549.26px) rotate(450deg)}} #e9Yjp3XycKs44_tr {animation: e9Yjp3XycKs44_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs44_tr__tr { 0% {transform: translate(967.42px,966.000001px) rotate(0deg)} 17.5% {transform: translate(967.42px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 25% {transform: translate(967.42px,966.000001px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 37.5% {transform: translate(967.42px,966.000001px) rotate(0deg)} 65% {transform: translate(967.42px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 72.5% {transform: translate(967.42px,966.000001px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 85% {transform: translate(967.42px,966.000001px) rotate(0deg)} 100% {transform: translate(967.42px,966.000001px) rotate(0deg)}} #e9Yjp3XycKs47_tr {animation: e9Yjp3XycKs47_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs47_tr__tr { 0% {transform: translate(920.35px,965.58px) rotate(0deg)} 17.5% {transform: translate(920.35px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 25% {transform: translate(920.35px,965.58px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 37.5% {transform: translate(920.35px,965.58px) rotate(0deg)} 65% {transform: translate(920.35px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 72.5% {transform: translate(920.35px,965.58px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 85% {transform: translate(920.35px,965.58px) rotate(0deg)} 100% {transform: translate(920.35px,965.58px) rotate(0deg)}} #e9Yjp3XycKs51_tr {animation: e9Yjp3XycKs51_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs51_tr__tr { 0% {transform: translate(920.160001px,965.58px) rotate(0deg)} 16.25% {transform: translate(920.160001px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 23.75% {transform: translate(920.160001px,965.58px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 36.25% {transform: translate(920.160001px,965.58px) rotate(0deg)} 63.75% {transform: translate(920.160001px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 71.25% {transform: translate(920.160001px,965.58px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 83.75% {transform: translate(920.160001px,965.58px) rotate(0deg)} 100% {transform: translate(920.160001px,965.58px) rotate(0deg)}} #e9Yjp3XycKs55_tr {animation: e9Yjp3XycKs55_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs55_tr__tr { 0% {transform: translate(902px,966.000001px) rotate(0deg)} 15% {transform: translate(902px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 22.5% {transform: translate(902px,966.000001px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 35% {transform: translate(902px,966.000001px) rotate(0deg)} 62.5% {transform: translate(902px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 70% {transform: translate(902px,966.000001px) rotate(10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 82.5% {transform: translate(902px,966.000001px) rotate(0deg)} 100% {transform: translate(902px,966.000001px) rotate(0deg)}} #e9Yjp3XycKs58_tr {animation: e9Yjp3XycKs58_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs58_tr__tr { 0% {transform: translate(833.34px,965.58px) rotate(0deg)} 15% {transform: translate(833.34px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 22.5% {transform: translate(833.34px,965.58px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 35% {transform: translate(833.34px,965.58px) rotate(0deg)} 62.5% {transform: translate(833.34px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 70% {transform: translate(833.34px,965.58px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 82.5% {transform: translate(833.34px,965.58px) rotate(0deg)} 100% {transform: translate(833.34px,965.58px) rotate(0deg)}} #e9Yjp3XycKs61_tr {animation: e9Yjp3XycKs61_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs61_tr__tr { 0% {transform: translate(819.29px,965.670001px) rotate(0deg)} 16.25% {transform: translate(819.29px,965.670001px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 23.75% {transform: translate(819.29px,965.670001px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 36.25% {transform: translate(819.29px,965.670001px) rotate(0deg)} 63.75% {transform: translate(819.29px,965.670001px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 71.25% {transform: translate(819.29px,965.670001px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 83.75% {transform: translate(819.29px,965.670001px) rotate(0deg)} 100% {transform: translate(819.29px,965.670001px) rotate(0deg)}} #e9Yjp3XycKs65_tr {animation: e9Yjp3XycKs65_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs65_tr__tr { 0% {transform: translate(819.29px,965.58px) rotate(0deg)} 16.25% {transform: translate(819.29px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 23.75% {transform: translate(819.29px,965.58px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 36.25% {transform: translate(819.29px,965.58px) rotate(0deg)} 63.75% {transform: translate(819.29px,965.58px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 71.25% {transform: translate(819.29px,965.58px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 83.75% {transform: translate(819.29px,965.58px) rotate(0deg)} 100% {transform: translate(819.29px,965.58px) rotate(0deg)}} #e9Yjp3XycKs68_tr {animation: e9Yjp3XycKs68_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs68_tr__tr { 0% {transform: translate(785.470001px,966.000001px) rotate(0deg)} 17.5% {transform: translate(785.470001px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 25% {transform: translate(785.470001px,966.000001px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 37.5% {transform: translate(785.470001px,966.000001px) rotate(0deg)} 65% {transform: translate(785.470001px,966.000001px) rotate(0deg);animation-timing-function: cubic-bezier(0.39,0.575,0.565,1)} 72.5% {transform: translate(785.470001px,966.000001px) rotate(-10deg);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 85% {transform: translate(785.470001px,966.000001px) rotate(0deg)} 100% {transform: translate(785.470001px,966.000001px) rotate(0deg)}} #e9Yjp3XycKs71_to {animation: e9Yjp3XycKs71_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs71_to__to { 0% {transform: translate(1033.089966px,946.799988px)} 20% {transform: translate(1033.089966px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 27.5% {transform: translate(1046.05081px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 42.5% {transform: translate(1033.089966px,946.799988px)} 67.5% {transform: translate(1033.089966px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 75% {transform: translate(1046.05081px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 90% {transform: translate(1033.089966px,946.799988px)} 100% {transform: translate(1033.089966px,946.799988px)}} #e9Yjp3XycKs72_to {animation: e9Yjp3XycKs72_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs72_to__to { 0% {transform: translate(967.369995px,890.650024px)} 17.5% {transform: translate(967.369995px,890.650024px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 25% {transform: translate(980.33084px,890.650024px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 40% {transform: translate(967.369995px,890.650024px)} 65% {transform: translate(967.369995px,890.650024px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 72.5% {transform: translate(980.33084px,890.650024px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 87.5% {transform: translate(967.369995px,890.650024px)} 100% {transform: translate(967.369995px,890.650024px)}} #e9Yjp3XycKs73_to {animation: e9Yjp3XycKs73_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs73_to__to { 0% {transform: translate(864.23999px,946.799988px)} 15% {transform: translate(864.23999px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 22.5% {transform: translate(852.691888px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 37.5% {transform: translate(864.23999px,946.799988px)} 62.5% {transform: translate(864.23999px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 70% {transform: translate(852.691888px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 85% {transform: translate(864.23999px,946.799988px)} 100% {transform: translate(864.23999px,946.799988px)}} #e9Yjp3XycKs74_to {animation: e9Yjp3XycKs74_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs74_to__to { 0% {transform: translate(785.859985px,810.369995px)} 17.5% {transform: translate(785.859985px,810.369995px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 25% {transform: translate(774.311883px,810.369995px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 40% {transform: translate(785.859985px,810.369995px)} 65% {transform: translate(785.859985px,810.369995px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 72.5% {transform: translate(774.311883px,810.369995px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 87.5% {transform: translate(785.859985px,810.369995px)} 100% {transform: translate(785.859985px,810.369995px)}} #e9Yjp3XycKs75_to {animation: e9Yjp3XycKs75_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs75_to__to { 0% {transform: translate(695.380005px,946.799988px)} 20% {transform: translate(695.380005px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 27.5% {transform: translate(683.831902px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 42.5% {transform: translate(695.380005px,946.799988px)} 67.5% {transform: translate(695.380005px,946.799988px);animation-timing-function: cubic-bezier(0.47,0,0.745,0.715)} 75% {transform: translate(683.831902px,946.799988px);animation-timing-function: cubic-bezier(0.36,0.005,0.32,1.275)} 90% {transform: translate(695.380005px,946.799988px)} 100% {transform: translate(695.380005px,946.799988px)}} #e9Yjp3XycKs80_to {animation: e9Yjp3XycKs80_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs80_to__to { 0% {transform: translate(553.532547px,498.211393px)} 5% {transform: translate(553.532547px,498.211393px);animation-timing-function: cubic-bezier(0,0,0.65,0.785)} 9.75% {transform: translate(959.792337px,719.34772px)} 100% {transform: translate(959.792337px,719.34772px)}} #e9Yjp3XycKs80_tr {animation: e9Yjp3XycKs80_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs80_tr__tr { 0% {transform: rotate(116.738749deg)} 5% {transform: rotate(116.738749deg);animation-timing-function: cubic-bezier(0,0,0.65,0.785)} 9.75% {transform: rotate(109.643232deg)} 100% {transform: rotate(109.643232deg)}} #e9Yjp3XycKs82_tk {animation: e9Yjp3XycKs82_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs82_tk__tk { 0% {transform: translate(822.209966px,637.9px) skewX(0deg) skewY(0deg)} 10% {transform: translate(822.209966px,637.9px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0,0,0.58,1)} 17.5% {transform: translate(822.209966px,637.9px) skewX(40deg) skewY(0deg)} 55% {transform: translate(822.209966px,637.9px) skewX(40deg) skewY(0deg);animation-timing-function: cubic-bezier(0.42,0,1,1)} 60% {transform: translate(822.209966px,637.9px) skewX(0deg) skewY(0deg)} 100% {transform: translate(822.209966px,637.9px) skewX(0deg) skewY(0deg)}} #e9Yjp3XycKs84_tr {animation: e9Yjp3XycKs84_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs84_tr__tr { 0% {transform: translate(1276.701412px,978.31206px) rotate(6.568519deg)} 17.5% {transform: translate(1276.701412px,978.31206px) rotate(91.573619deg)} 45% {transform: translate(1276.701412px,978.31206px) rotate(-120.438548deg)} 55% {transform: translate(1276.701412px,978.31206px) rotate(-149.986741deg)} 67.5% {transform: translate(1276.701412px,978.31206px) rotate(-120.438548deg)} 80% {transform: translate(1276.701412px,978.31206px) rotate(59.561452deg)} 85% {transform: translate(1276.701412px,978.31206px) rotate(92.413174deg)} 97.5% {transform: translate(1276.701412px,978.31206px) rotate(59.561452deg)} 100% {transform: translate(1276.701412px,978.31206px) rotate(59.561452deg)}} #e9Yjp3XycKs84_tk {animation: e9Yjp3XycKs84_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs84_tk__tk { 0% {transform: skewX(0deg) skewY(0deg)} 2.5% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: skewX(0deg) skewY(-30deg)} 25% {transform: skewX(0deg) skewY(-30deg)} 37.5% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 50% {transform: skewX(0deg) skewY(30deg)} 62.5% {transform: skewX(0deg) skewY(30deg)} 80% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: skewX(0deg) skewY(-30deg)} 100% {transform: skewX(0deg) skewY(-30deg)}} #e9Yjp3XycKs84_ts {animation: e9Yjp3XycKs84_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs84_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: scale(1,0.936644)} 25% {transform: scale(1,0.936644)} 37.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 37.75% {transform: scale(-1,1)} 79.75% {transform: scale(-1,1)} 80% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: scale(1,0.936644)} 100% {transform: scale(1,0.936644)}} #e9Yjp3XycKs88_tk {animation: e9Yjp3XycKs88_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs88_tk__tk { 0% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg)} 2.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 25% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 37.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 50% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 62.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 80% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 100% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)}} #e9Yjp3XycKs88_ts {animation: e9Yjp3XycKs88_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs88_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: scale(1.3,1)} 25% {transform: scale(1.3,1)} 37.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 50% {transform: scale(1.3,1)} 62.5% {transform: scale(1.3,1)} 80% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: scale(1.3,1)} 100% {transform: scale(1.3,1)}} #e9Yjp3XycKs89_tk {animation: e9Yjp3XycKs89_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs89_tk__tk { 0% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg)} 2.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 25% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 37.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 50% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 62.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 80% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 100% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)}} #e9Yjp3XycKs89_ts {animation: e9Yjp3XycKs89_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs89_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 10% {transform: scale(0.7,1)} 25% {transform: scale(0.7,1)} 37.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 50% {transform: scale(0.7,1)} 62.5% {transform: scale(0.7,1)} 80% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 92.5% {transform: scale(0.7,1)} 100% {transform: scale(0.7,1)}} #e9Yjp3XycKs91_to {animation: e9Yjp3XycKs91_to__to 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs91_to__to { 0% {offset-distance: 0%;animation-timing-function: cubic-bezier(0,0,0.635,0.795)} 10% {offset-distance: 25.636862%} 25% {offset-distance: 52.632083%} 37.5% {offset-distance: 73.806865%} 47.5% {offset-distance: 84.128621%;animation-timing-function: cubic-bezier(0.515,0.235,0.945,0.68)} 57.5% {offset-distance: 100%} 100% {offset-distance: 100%}} #e9Yjp3XycKs91 {animation: e9Yjp3XycKs91_c_o 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs91_c_o { 0% {opacity: 1} 55% {opacity: 1;animation-timing-function: cubic-bezier(0.55,0.055,0.675,0.19)} 57.5% {opacity: 0.24} 100% {opacity: 0.24}} #e9Yjp3XycKs92_tr {animation: e9Yjp3XycKs92_tr__tr 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs92_tr__tr { 0% {transform: translate(1276.701412px,978.31206px) rotate(34.584825deg)} 10% {transform: translate(1276.701412px,978.31206px) rotate(22.062699deg)} 25% {transform: translate(1276.701412px,978.31206px) rotate(-179.547154deg)} 31.25% {transform: translate(1276.701412px,978.31206px) rotate(-213.288412deg)} 37.5% {transform: translate(1276.701412px,978.31206px) rotate(-180deg)} 45% {transform: translate(1276.701412px,978.31206px) rotate(12.173688deg)} 50% {transform: translate(1276.701412px,978.31206px) rotate(35deg)} 60% {transform: translate(1276.701412px,978.31206px) rotate(0deg)} 100% {transform: translate(1276.701412px,978.31206px) rotate(0deg)}} #e9Yjp3XycKs92_tk {animation: e9Yjp3XycKs92_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs92_tk__tk { 0% {transform: skewX(0deg) skewY(0deg)} 2.5% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: skewX(0deg) skewY(-30deg)} 12.5% {transform: skewX(0deg) skewY(-30deg)} 20% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {transform: skewX(0deg) skewY(30deg)} 37.5% {transform: skewX(0deg) skewY(30deg)} 42.5% {transform: skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: skewX(0deg) skewY(-30deg)} 56.25% {transform: skewX(0deg) skewY(-20deg)} 100% {transform: skewX(0deg) skewY(-20deg)}} #e9Yjp3XycKs92_ts {animation: e9Yjp3XycKs92_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs92_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: scale(1,0.936644)} 12.5% {transform: scale(1,0.936644)} 20% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 20.25% {transform: scale(-1,1)} 42.25% {transform: scale(-1,1)} 42.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: scale(1,0.936644)} 56.25% {transform: scale(1,1)} 100% {transform: scale(1,1)}} #e9Yjp3XycKs94 {animation-name: e9Yjp3XycKs94__m, e9Yjp3XycKs94_f_p;animation-duration: 4000ms;animation-fill-mode: forwards;animation-timing-function: linear;animation-direction: normal;animation-iteration-count: infinite;}@keyframes e9Yjp3XycKs94__m { 0% {d: path('M1464.321,904.303L1449.864,1109.487L1464.322,1129.954L1478.779,1109.487L1464.321,904.303')} 2.5% {d: path('M1464.321,904.303L1449.864,1109.487L1464.322,1129.954L1478.779,1109.487L1464.321,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {d: path('M1464.321,904.303L1454.248128,1113.241261L1510.609301,1170.694334L1492.109559,1119.348748L1464.321,904.303')} 12.5% {d: path('M1464.321,904.303L1454.248128,1113.241261L1510.609301,1170.694334L1492.109559,1119.348748L1464.321,904.303')} 20% {d: path('M1464.321,904.303L1449.864,1109.487L1464.322,1129.954L1478.779,1109.487L1464.321,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {d: path('M1464.321,904.303L1454.248128,1113.241261L1510.609301,1170.694334L1492.109559,1119.348748L1464.321,904.303')} 37.5% {d: path('M1464.321,904.303L1454.248128,1113.241261L1510.609301,1170.694334L1492.109559,1119.348748L1464.321,904.303')} 42.5% {d: path('M1464.321,904.303L1449.864,1109.487L1464.322,1129.954L1478.779,1109.487L1464.321,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {d: path('M1464.321,904.303L1454.248128,1113.241261L1510.609301,1170.694334L1492.109559,1119.348748L1464.321,904.303')} 56.25% {d: path('M1464.321,904.303L1458.702549,1114.202277L1518.069431,1154.380318L1492.109559,1119.348748L1464.321,904.303')} 100% {d: path('M1464.321,904.303L1458.702549,1114.202277L1518.069431,1154.380318L1492.109559,1119.348748L1464.321,904.303')}}@keyframes e9Yjp3XycKs94_f_p { 0% {fill: #1c2747} 2.5% {fill: #1c2747;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {fill: #0559e8} 12.5% {fill: #0559e8} 20% {fill: #1c2747;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {fill: #0559e8} 37.5% {fill: #0559e8} 42.5% {fill: #1c2747;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {fill: #0559e8} 100% {fill: #0559e8}} #e9Yjp3XycKs95 {animation-name: e9Yjp3XycKs95__m, e9Yjp3XycKs95_f_p;animation-duration: 4000ms;animation-fill-mode: forwards;animation-timing-function: linear;animation-direction: normal;animation-iteration-count: infinite;}@keyframes e9Yjp3XycKs95__m { 0% {d: path('M1464.322,904.303L1478.779,1109.488L1464.322,1129.954L1464.322,904.303')} 2.5% {d: path('M1464.322,904.303L1478.779,1109.488L1464.322,1129.954L1464.322,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {d: path('M1464.322,904.303L1482.75804,1117.007588L1510.60931,1170.694327L1464.322,904.303')} 12.5% {d: path('M1464.322,904.303L1482.75804,1117.007588L1510.60931,1170.694327L1464.322,904.303')} 20% {d: path('M1464.322,904.303L1478.779,1109.488L1464.322,1129.954L1464.322,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {d: path('M1464.322,904.303L1482.75804,1117.007588L1510.60931,1170.694327L1464.322,904.303')} 37.5% {d: path('M1464.322,904.303L1482.75804,1117.007588L1510.60931,1170.694327L1464.322,904.303')} 42.5% {d: path('M1464.322,904.303L1478.779,1109.488L1464.322,1129.954L1464.322,904.303');animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {d: path('M1464.322,904.303L1482.75804,1117.007588L1510.60931,1170.694327L1464.322,904.303')} 56.25% {d: path('M1464.322,904.303L1473.438999,1107.492857L1518.313076,1154.412198L1464.322,904.303')} 100% {d: path('M1464.322,904.303L1473.438999,1107.492857L1518.313076,1154.412198L1464.322,904.303')}}@keyframes e9Yjp3XycKs95_f_p { 0% {fill: #0559e8} 2.5% {fill: #0559e8;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {fill: #1c2747} 12.5% {fill: #1c2747} 20% {fill: #0559e8;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {fill: #1c2747} 37.5% {fill: #1c2747} 42.5% {fill: #0559e8;animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {fill: #1c2747} 100% {fill: #1c2747}} #e9Yjp3XycKs96_tk {animation: e9Yjp3XycKs96_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs96_tk__tk { 0% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg)} 2.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 12.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 20% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 37.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 42.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(20deg)} 56.25% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(-20deg)} 100% {transform: translate(1465.027759px,905.370292px) skewX(0deg) skewY(-20deg)}} #e9Yjp3XycKs96_ts {animation: e9Yjp3XycKs96_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs96_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: scale(1.3,1)} 12.5% {transform: scale(1.3,1)} 20% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {transform: scale(1.3,1)} 37.5% {transform: scale(1.3,1)} 42.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: scale(1.3,1)} 56.25% {transform: scale(0.616719,1)} 100% {transform: scale(0.616719,1)}} #e9Yjp3XycKs97_tk {animation: e9Yjp3XycKs97_tk__tk 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs97_tk__tk { 0% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg)} 2.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 12.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 20% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 37.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 42.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(0deg);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-20deg)} 56.25% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-40deg)} 100% {transform: translate(1464.322002px,904.303px) skewX(0deg) skewY(-40deg)}} #e9Yjp3XycKs97_ts {animation: e9Yjp3XycKs97_ts__ts 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs97_ts__ts { 0% {transform: scale(1,1)} 2.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 7.5% {transform: scale(0.7,1)} 12.5% {transform: scale(0.7,1)} 20% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 27.5% {transform: scale(0.7,1)} 37.5% {transform: scale(0.7,1)} 42.5% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.215,0.61,0.355,1)} 47.5% {transform: scale(0.7,1)} 56.25% {transform: scale(0.388674,1)} 100% {transform: scale(0.388674,1)}} #e9Yjp3XycKs101 {animation: e9Yjp3XycKs101_c_o 4000ms linear infinite normal forwards}@keyframes e9Yjp3XycKs101_c_o { 0% {opacity: 0} 50% {opacity: 0} 52.5% {opacity: 1} 100% {opacity: 1}}\n",
          }}
        />
        <g transform="matrix(.335245 0 0 0.335245 59.198993-200.565152)">
          <rect
            width={1600}
            height="1199.8"
            rx={0}
            ry={0}
            transform="matrix(1.321372 0 0 1.018993-189.358241-13.218578)"
            fill="#f5f5fa"
          />
          <g>
            <g>
              <rect
                width="45.63"
                height="353.56"
                rx={0}
                ry={0}
                transform="translate(836.08 612.2)"
                fill="#f77331"
              />
              <rect
                width="28.15"
                height="353.56"
                rx={0}
                ry={0}
                transform="translate(864.24 612.2)"
                fill="#f7932f"
              />
            </g>
            <g
              id="e9Yjp3XycKs25_to"
              transform="translate(780.484985,532.785019)"
            >
              <g transform="translate(-780.484985,-532.785018)">
                <polygon
                  points="892.39,653.63 836.08,675.88 836.08,627.93 892.39,627.93 892.39,653.63"
                  fill="#212129"
                />
                <path
                  d="M928.19,427.67h-170.07v210.22h272.74v-107.54c.002652-27.23151-10.813164-53.348595-30.067811-72.605118s-45.370679-30.074882-72.602189-30.074882Z"
                  fill="#fff"
                />
                <path
                  d="M759.81,427.67h-3.38C699.307188,427.67,653,473.977188,653,531.1v106.79h210.23v-106.79c.000001-57.118906-46.301093-103.424477-103.42-103.43Z"
                  fill="#fff"
                />
                <path
                  d="M758.12,434.06v0c-26.12729-.002653-51.185235,10.375198-69.660018,28.849982s-28.852635,43.532728-28.849982,69.660018v98.51h197v-98.51c.002652-26.123824-10.372453-51.178738-28.842911-69.652947s-43.523265-28.854401-69.647089-28.857053Z"
                  fill="#1c2747"
                />
                <g
                  id="e9Yjp3XycKs31_ts"
                  transform="translate(758.12,637.89) scale(1,1)"
                >
                  <g transform="translate(-758.119993,-637.89)">
                    <g
                      id="e9Yjp3XycKs32_tk"
                      transform="translate(758.12,637.9) skewX(0) skewY(0)"
                    >
                      <path
                        d="M759.81,427.67h-3.38C699.307188,427.67,653,473.977188,653,531.1v106.79h210.23v-106.79c.000001-57.118906-46.301093-103.424477-103.42-103.43Z"
                        transform="translate(-758.119998,-637.9)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </g>
                <rect
                  id="e9Yjp3XycKs33"
                  width="333.12"
                  height="6.82"
                  rx={0}
                  ry={0}
                  transform="translate(530.110001 631.08)"
                  opacity={0}
                  fill="#fff"
                />
                <rect
                  width="167.63"
                  height="107.55"
                  rx={0}
                  ry={0}
                  transform="translate(863.23 530.35)"
                  fill="#e9e9f0"
                />
                <g
                  id="e9Yjp3XycKs35_tr"
                  transform="translate(904.38,549.26) rotate(90)"
                >
                  <g transform="translate(-904.379999,-549.26)">
                    <rect
                      width="6.82"
                      height="74.17"
                      rx={0}
                      ry={0}
                      transform="translate(900.97 474.56)"
                      fill="#fd463f"
                    />
                    <circle
                      r="11.99"
                      transform="translate(904.38 549.26)"
                      fill="#fd463f"
                    />
                    <rect
                      width="58.1"
                      height="39.97"
                      rx={2}
                      ry={2}
                      transform="translate(900.97 467.76)"
                      fill="#fd463f"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g
                id="e9Yjp3XycKs44_tr"
                transform="translate(967.42,966.000001) rotate(0)"
              >
                <g transform="translate(-967.42,-966.000001)">
                  <path
                    d="M967.42,966c0,0,18-42.07,49-75.74-.04.02-10.05,47.24-49,75.74Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M967.42,966c0,0,9.86-47.32,49-75.74Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs47_tr"
                transform="translate(920.35,965.58) rotate(0)"
              >
                <g transform="translate(-920.35,-965.58)">
                  <line
                    x1="940.2"
                    y1="871.98"
                    x2="920.35"
                    y2="965.66"
                    fill="none"
                    stroke="#1c2747"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                  />
                  <path
                    d="M927.15,933.24c0,0,2.74-68.58,28.2-132.32c0,0,11.17,71.54-28.2,132.32Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M927.15,933.24c0,0-11.45-71.61,28.2-132.32Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs51_tr"
                transform="translate(920.160001,965.58) rotate(0)"
              >
                <g transform="translate(-920.16,-965.579999)">
                  <line
                    x1="920.18"
                    y1="810.37"
                    x2="920.16"
                    y2="965.66"
                    fill="none"
                    stroke="#1c2747"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                  />
                  <path
                    d="M920.18,873c0,0-11.6-67.65,0-135.29c0,0,25.82,67.64,0,135.29Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M920.18,873c0,0-26.12-67.65,0-135.29Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs55_tr"
                transform="translate(902,966.000001) rotate(0)"
              >
                <g transform="translate(-902,-966)">
                  <path
                    d="M902,966c0,0-27.9-86.26-25.45-176.89-.03.02,46.45,83.6,25.45,176.89Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M902,966c0,0-46.88-83.53-25.45-176.89Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs58_tr"
                transform="translate(833.34,965.58) rotate(0)"
              >
                <g transform="translate(-833.339998,-965.579999)">
                  <path
                    d="M833.34,965.67c0,0-.12-54.83,18-106.57.05,0,11.38,56.73-18,106.57Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M833.34,965.67c0,0-11.55-56.77,18-106.57Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs61_tr"
                transform="translate(819.29,965.670001) rotate(0)"
              >
                <g transform="translate(-819.29,-965.67)">
                  <line
                    x1="819.29"
                    y1="824.81"
                    x2="819.29"
                    y2="965.67"
                    fill="none"
                    stroke="#1c2747"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                  />
                  <path
                    d="M819.29,876.41c0,0-9.56-55.73,0-111.45c0,.04,21.29,55.72,0,111.45Z"
                    fill="#1c2747"
                  />
                  <path
                    d="M819.29,876.41c0,0-21.51-55.73,0-111.45Z"
                    fill="#0559e8"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs65_tr"
                transform="translate(819.29,965.58) rotate(0)"
              >
                <g transform="translate(-819.289999,-965.58)">
                  <path
                    d="M819.29,965.67c0,0-17.9-81.25-61.86-151.89c0,0,1.92,87.76,61.86,151.89Z"
                    fill="#0559e8"
                  />
                  <path
                    d="M819.29,965.67c0,0-1.6-87.89-61.86-151.89Z"
                    fill="#1c2747"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs68_tr"
                transform="translate(785.470001,966.000001) rotate(0)"
              >
                <g transform="translate(-785.47,-966.000001)">
                  <path
                    d="M785.47,966c0,0-23.17-44.12-59.73-78c0,0,14.97,50.43,59.73,78Z"
                    fill="#0559e8"
                  />
                  <path
                    d="M785.47,966c0,0-14.81-50.52-59.73-78Z"
                    fill="#1c2747"
                  />
                </g>
              </g>
              <g
                id="e9Yjp3XycKs71_to"
                transform="translate(1033.089966,946.799988)"
              >
                <circle
                  r="6.11"
                  transform="translate(0.000034,0.000012)"
                  fill="#fff"
                />
              </g>
              <g
                id="e9Yjp3XycKs72_to"
                transform="translate(967.369995,890.650024)"
              >
                <circle
                  r="6.11"
                  transform="translate(0.000005,-0.000024)"
                  fill="#fff"
                />
              </g>
              <g
                id="e9Yjp3XycKs73_to"
                transform="translate(864.23999,946.799988)"
              >
                <circle
                  r="6.11"
                  transform="translate(0.00001,0.000012)"
                  fill="#fff"
                />
              </g>
              <g
                id="e9Yjp3XycKs74_to"
                transform="translate(785.859985,810.369995)"
              >
                <circle
                  r="6.11"
                  transform="translate(0.000015,0.000005)"
                  fill="#fff"
                />
              </g>
              <g
                id="e9Yjp3XycKs75_to"
                transform="translate(695.380005,946.799988)"
              >
                <circle
                  r="6.11"
                  transform="translate(-0.000005,0.000012)"
                  fill="#fff"
                />
              </g>
              <rect
                width="648.29"
                height="6.82"
                rx={0}
                ry={0}
                transform="translate(539.95 962.35)"
                fill="#f7932f"
              />
            </g>
          </g>
          <g mask="url(#e9Yjp3XycKs81)">
            <g
              id="e9Yjp3XycKs80_to"
              transform="translate(553.532547,498.211393)"
            >
              <g id="e9Yjp3XycKs80_tr" transform="rotate(116.738749)">
                <path
                  d="M1467.013732,874.649005l105.061184,186.797623c1.29219,2.7824.98718,5.34533-.81172,6.82068q-1.7989,1.47535-61.640862,31.580901l.752318,43.184636-57.755042-20.384828-38.796427,6.759545c-1.78925.63423-3.4586-.04597-4.44263-1.81019s-1.15089-4.37611-.44408-6.95097"
                  transform="scale(0.932527,0.786318) translate(-1460.559509,-1017.128479)"
                  fill="#e9e9f0"
                />
              </g>
            </g>
            <mask id="e9Yjp3XycKs81">
              <g
                id="e9Yjp3XycKs82_tk"
                transform="translate(822.209966,637.9) skewX(0) skewY(0)"
              >
                <path
                  d="M653,637.89v-106.79c0-57.12281,46.30719-103.43,103.43-103.43h171.76c27.23151,0,53.34754,10.81836,72.60219,30.07488s30.07046,45.37361,30.06781,72.60512v107.55h-167.63v-.01h-210.23Z"
                  transform="translate(-822.209966,-637.9)"
                  fill="#fff"
                  strokeWidth={0}
                />
              </g>
            </mask>
          </g>
          <g mask="url(#e9Yjp3XycKs98)">
            <g
              id="e9Yjp3XycKs91_to"
              style={{
                offsetPath:
                  'path("M1.000001,199.750001C41.496758,216.379276,446.55,439.355907,982.75,725.165907C1511.75,1007.165907,1745.57,281.28,1216.75,199.75C922.69,154.42,653.000003,479.69,355,479.69C73.63,479.69,162.45,230.63,355,328.89C531.24,418.83,622.55,555.36998,991.89,555.36998")',
                offsetRotate: "0deg",
              }}
            >
              <g
                id="e9Yjp3XycKs91"
                transform="rotate(90) scale(0.653491,0.653491) translate(-1276.701721,-978.311523)"
              >
                <g
                  id="e9Yjp3XycKs92_tr"
                  transform="translate(1276.701412,978.31206) rotate(34.584825)"
                >
                  <g id="e9Yjp3XycKs92_tk" transform="skewX(0) skewY(0)">
                    <g id="e9Yjp3XycKs92_ts" transform="scale(1,1)">
                      <g transform="translate(-1462.316285,-1017.128479)">
                        <g>
                          <path
                            id="e9Yjp3XycKs94"
                            d="M1464.321,904.303L1449.864,1109.487L1464.322,1129.954L1478.779,1109.487L1464.321,904.303Z"
                            fill="#1c2747"
                          />
                          <path
                            id="e9Yjp3XycKs95"
                            d="M1464.322,904.303L1478.779,1109.488L1464.322,1129.954L1464.322,904.303Z"
                            fill="#0559e8"
                          />
                        </g>
                        <g
                          id="e9Yjp3XycKs96_tk"
                          transform="translate(1465.027759,905.370292) skewX(0) skewY(0)"
                        >
                          <g id="e9Yjp3XycKs96_ts" transform="scale(1,1)">
                            <path
                              d="M1462.452865,961.801492L1477.960677,1109.487l58.455243.0005c2.53009-.000048,4.890661-1.27205,6.282128-3.385146s1.627395-4.784167.627872-7.108454l-79.710681-195.758192Z"
                              transform="translate(-1464.321998,-904.303)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                        <g
                          id="e9Yjp3XycKs97_tk"
                          transform="translate(1464.322002,904.303) skewX(0) skewY(0)"
                        >
                          <g id="e9Yjp3XycKs97_ts" transform="scale(1,1)">
                            <path
                              d="M1464.322,904.303l-83.7212,194.6909c-.999469,2.324288-.763515,4.995329.627941,7.108409s3.751989,3.385092,6.282059,3.385191l62.3532-.0005l15.457701-147.780597Z"
                              transform="translate(-1464.322002,-904.303)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <mask
              id="e9Yjp3XycKs98"
              mask-type="luminance"
              x="-150%"
              y="-150%"
              height="400%"
              width="400%"
            >
              <g>
                <rect
                  width={1600}
                  height="1199.999999"
                  rx={0}
                  ry={0}
                  transform="translate(64.24 0.000002)"
                  fill="#fff"
                  strokeWidth={0}
                />
                <path
                  id="e9Yjp3XycKs101"
                  d="M758.12,434.06v0c-26.12729-.002653-9.914862-203.43-9.914862-203.43s808.10812-10.663594,808.10812-10.663594l7.146475,417.933596L856.61,631.08v-98.51c.002652-26.123824-10.372453-51.178738-28.842911-69.652947s-43.523265-28.854401-69.647089-28.857053Z"
                  transform="translate(.150034 0)"
                  opacity={0}
                />
              </g>
            </mask>
          </g>
        </g>
      </svg>
      <div className="text-center px-5">
        <div className="font-bold text-lg mb-2">
          "Đặt lịch" thành công rồi nhé.
        </div>
        <div>
          Chúng tôi sẽ sớm liên hệ lại cho bạn để nhận đặt lịch. Bạn vui lòng
          chờ ...{" "}
        </div>
      </div>
      <div className="flex items-center flex-col mt-10">
        <NavLink
          className="bg-app text-white w-[180px] text-center py-3.5 rounded shadow-3xl font-medium"
          to="/user/customer-booking-manage"
        >
          Quản lý đặt lịch
        </NavLink>
        <div
          className="border-app text-app border w-[180px] text-center py-3.5 rounded mt-2.5 shadow-3xl font-medium"
          onClick={() => {
            navigate({
              pathname: "/booking",
              options: {
                state: null,
              },
            });
          }}
        >
          Đặt lịch mới
        </div>
      </div>
    </div>
  );
};

export default BookingFinish;
