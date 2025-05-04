import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "../../components/CustomButton";
import { onboarding } from "../../constants/index";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < onboarding.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      router.replace("/(auth)/sign-up");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-between">
      {/* Skip Button */}
      {activeIndex < onboarding.length - 1 && (
        <Text
          className="absolute top-5 right-5 z-10 text-sm font-JakartaSemiBold text-black"
          onPress={() => router.replace("/(auth)/sign-up")}
        >
          Skip
        </Text>
      )}

      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View className="w-2 h-2 mx-1 bg-gray-300 rounded-full" />}
        activeDot={<View className="w-4 h-2 mx-1 bg-blue-500 rounded-full" />}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-center px-6">
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-full h-[330px]"
            />
            <View className="mt-10 px-4">
              <Text className="text-center text-[22px] leading-8 text-black font-JakartaBold">
                {item.title}
              </Text>
              <Text className="text-center text-[14px] leading-6 text-gray-500 mt-3 font-JakartaRegular">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Custom Button */}
      <View className="px-6 pb-6">
        <CustomButton
          title={activeIndex === onboarding.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
