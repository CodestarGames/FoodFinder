import {FC} from "react";
import {StarIcon, StarOffIcon} from "lucide-react";

export const RatingStars: FC<{rating:number}> = ({rating}) => {
    return (
        <div className="flex flex-row-1">{
            Array.from({length: 5}).map((_, index) => index <= Math.floor(rating / 2) ?
                <StarIcon key={index} size="16"/> : <StarOffIcon key={index} size="16"/>)
        }</div>
    )
}
