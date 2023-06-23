import { Box, Text, Image, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/button/Button";
import StarRating from "../components/starRating/StarRating";
import { useLanguage } from "../hooks/useLanguage";
import feedbackImg from "../public/images/feedbackImg.svg";

const Feedback = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [ratingForStore, setRatingForStore] = useState(0);
  const [rating, setRating] = useState(0);
  return (
    <>
      <Box pt={"12px"} textAlign={"center"} pb={"15px"}>
        <Text fontSize={"18px"}>{t.orderDeliveredOnTime}</Text>
        <Text fontSize={"12px"}>{t.shareYourfeedback}</Text>
      </Box>
      <Box mb={"10px"}>
        <Image src={feedbackImg} margin={"0 auto"} />
      </Box>
      <StarRating
        ratingText={"Rate the store"}
        rating={ratingForStore}
        setRating={setRatingForStore}
        count={5}
        size={20}
        transition={""}
      />
      <StarRating
        ratingText={"Rate the delivery experience"}
        rating={rating}
        setRating={setRating}
        count={5}
        size={20}
        transition={""}
      />
      <Box>
        <Text fontSize={"12px"} mb={"10px"}>
          Add your comments here
        </Text>
        <Textarea
          height={"124px"}
          resize={"none"}
          mb={"20px"}
          placeholder="Write about your experience.."
          boxShadow={
            "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)"
          }
        />
      </Box>
      <Button
        buttonText={t.submitReview}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        handleOnClick={() => {
          router.push("/");
        }}
      />
      <Button
        buttonText={t.skipForNow}
        background={"rgba(var(--text-color))"}
        color={"rgba(var(--color-primary))"}
        handleOnClick={() => {
          router.push("/");
        }}
      />
    </>
  );
};

export default Feedback;
