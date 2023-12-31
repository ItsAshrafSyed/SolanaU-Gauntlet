import React from "react";
import {
	Box,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	HStack,
	Button,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useState, useEffect } from "react";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { fetchApiResponse } from "@/util/lib";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

type FailureMessageProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen?: () => void;
};

const FailureMessage: FC<FailureMessageProps> = ({ isOpen, onClose }) => {
	const [twitterUrl, setTwitterUrl] = useState("");
	const [discordUrl, setDiscordUrl] = useState("");
	const [githubUrl, setGithubUrl] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { publicKey } = useWallet();
	const router = useRouter();

	const handleSubmit = async () => {
		setIsSubmitting(true);
		const res = await fetchApiResponse<any>({
			url: `/api/users/${publicKey?.toBase58()}`,
			method: "PUT",
			body: {
				twitterUrl: twitterUrl,
				discordUrl: discordUrl,
				githubUrl: githubUrl,
			},
		});
		setIsSubmitting(false);
		onClose();
		router.reload();
	};

	useEffect(() => {
		setCanSubmit(
			twitterUrl.length > 0 && discordUrl.length > 0 && githubUrl.length > 0
		);
	}, [twitterUrl, discordUrl, githubUrl]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent bg="#111" border={"1px solid #E5E7EB"}>
				<ModalHeader color={"White"}>
					paste links to social accounts
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box className="flex flex-col">
						<HStack>
							<FaTwitter size={"5vh"} />
							<Input
								type="text"
								name="twitter"
								placeholder="https://twitter.com/my_twitter_handle"
								value={twitterUrl}
								onChange={(e) => {
									setTwitterUrl(e.target.value);
								}}
							/>
						</HStack>

						<HStack mt={"1"}>
							<FaDiscord size={"5vh"} />
							<Input
								type="text"
								name="discord"
								placeholder="my_discord_handle"
								value={discordUrl}
								onChange={(e) => {
									setDiscordUrl(e.target.value);
								}}
							/>
						</HStack>

						<HStack mt={"1"}>
							<FaGithub size={"5vh"} />
							<Input
								type="text"
								name="github"
								placeholder="https://github.com/my_github_handle"
								value={githubUrl}
								onChange={(e) => {
									setGithubUrl(e.target.value);
								}}
							/>
						</HStack>
					</Box>
				</ModalBody>
				<ModalFooter>
					<VStack>
						<Text color={"grey"}>
							NOTE: make sure the links are correct, this info is critical for
							your evaluation
						</Text>
						<HStack alignItems={"flex-end"}>
							<Button onClick={onClose} mr={"4"}>
								Close
							</Button>
							<Button
								variant={"solid"}
								textColor={"white"}
								_hover={{
									bg: "transparent",
								}}
								border="1px solid #FFB84D"
								borderRadius={"8"}
								background="#261B0B"
								isLoading={isSubmitting}
								isDisabled={!canSubmit}
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</HStack>
					</VStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FailureMessage;
