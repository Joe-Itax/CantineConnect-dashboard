/*"use client";

import {
  useId,
  // useState
} from "react";
import { CheckIcon, EditIcon, ImagePlusIcon, XIcon } from "lucide-react";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

// Pretend we have initial image files
const initialBgImage = [
  {
    name: "profile-bg.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/profile-bg.jpg",
    id: "profile-bg-123456789",
  },
];

const initialAvatarImage = [
  {
    name: "avatar-72-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/avatar-72-01.jpg",
    id: "avatar-123456789",
  },
];

export default function EditProfile() {
  const id = useId();

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue:
      "Hey, I am Margaret, a web developer who loves turning ideas into amazing websites!",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Modifier
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Modifier le profil
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg />
          <Avatar />
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>First name</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="Matt"
                    defaultValue="Margaret"
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Last name</Label>
                  <Input
                    id={`${id}-last-name`}
                    placeholder="Welsh"
                    defaultValue="Villard"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-username`}>Username</Label>
                <div className="relative">
                  <Input
                    id={`${id}-username`}
                    className="peer pe-9"
                    placeholder="Username"
                    defaultValue="margaret-villard-69"
                    type="text"
                    required
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-website`}>Website</Label>
                <div className="flex rounded-md shadow-xs">
                  <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                    https://
                  </span>
                  <Input
                    id={`${id}-website`}
                    className="-ms-px rounded-s-none shadow-none"
                    placeholder="yourwebsite.com"
                    defaultValue="www.margaret.com"
                    type="text"
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-bio`}>Biography</Label>
                <Textarea
                  id={`${id}-bio`}
                  placeholder="Write a few sentences about yourself"
                  defaultValue={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  aria-describedby={`${id}-description`}
                />
                <p
                  id={`${id}-description`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{limit - characterCount}</span>{" "}
                  characters left
                </p>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: initialBgImage,
    });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage && (
          <Image
            className="size-full object-cover"
            src={currentImage}
            alt={
              files[0]?.preview
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={openFileDialog}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
      />
    </div>
  );
}

function Avatar() {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: initialAvatarImage,
  });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="-mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <Image
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          onClick={openFileDialog}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
*/
"use client";

import { useId } from "react";
import {
  // CheckIcon,
  EditIcon,
  ImagePlusIcon,
  // XIcon,
  // MapPinIcon,
  MailIcon,
  PhoneIcon,
  CakeIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialAvatarImage = [
  {
    name: "avatar.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/avatar.jpg",
    id: "avatar-123456789",
  },
];

export default function EditProfile() {
  const id = useId();
  const { user } = useAuth();
  const maxLength = 180;
  const { value, characterCount, handleChange } = useCharacterLimit({
    maxLength,
    initialValue: "Administrateur de la plateforme Cantine Connect",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Modifier le profil
          <EditIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Modifier le profil</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[80vh]">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-start gap-4">
              <AvatarSection />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={"outline"} className="px-2 py-0.5">
                    <ShieldCheckIcon className="size-4 text-primary mr-1" />
                    Admin
                  </Badge>
                </div>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-name`}>
                    <span className="flex items-center gap-2">
                      <span>Nom complet</span>
                    </span>
                  </Label>
                  <Input
                    id={`${id}-name`}
                    defaultValue={user?.name}
                    placeholder="Nom complet"
                    type="text"
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Nom</Label>
                  <Input
                    id={`${id}-last-name`}
                    defaultValue="Khaleira"
                    type="text"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor={`${id}-email`}>
                    <span className="flex items-center gap-2">
                      <MailIcon size={16} />
                      <span>Email</span>
                    </span>
                  </Label>
                  <Input
                    id={`${id}-email`}
                    defaultValue={user?.email}
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-phone`}>
                    <span className="flex items-center gap-2">
                      <PhoneIcon size={16} />
                      <span>Téléphone</span>
                    </span>
                  </Label>
                  <Input
                    id={`${id}-phone`}
                    defaultValue="(+243) 97 78 73 421"
                    type="tel"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-dob`}>
                    <span className="flex items-center gap-2">
                      <CakeIcon size={16} />
                      <span>Date de naissance</span>
                    </span>
                  </Label>
                  <Input
                    id={`${id}-dob`}
                    defaultValue="12-10-1990"
                    type="date"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-role`}>Rôle</Label>
                  <Input
                    id={`${id}-role`}
                    defaultValue="Admin"
                    type="text"
                    disabled
                  />
                </div>
              </div>

              <div className="pt-2">
                <Label htmlFor={`${id}-bio`}>Biographie</Label>
                <Textarea
                  id={`${id}-bio`}
                  defaultValue={value}
                  onChange={handleChange}
                  maxLength={maxLength}
                  className="min-h-[100px]"
                  disabled
                />
                <p className="text-muted-foreground text-xs text-right mt-1">
                  {maxLength - characterCount} caractères restants
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Enregistrer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AvatarSection() {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: initialAvatarImage,
  });

  const { user } = useAuth();
  const avatarFallback = user?.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const currentImage = files[0]?.preview || null;

  return (
    <div className="relative">
      <div className="relative size-20 rounded-full border-2 border-white shadow-md overflow-hidden">
        {/* {currentImage ? (
          <Image
            src={currentImage}
            alt="Photo de profil"
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-muted h-full w-full flex items-center justify-center">
            <span className="text-lg font-medium">NK</span>
          </div>
        )} */}
        <Avatar className="size-full rounded-full">
          <AvatarImage
            className="object-cover"
            src={user?.avatarUrl || currentImage || "/placeholder-avatar.png"}
            alt={user?.name}
          />
          <AvatarFallback className="rounded-full text-xl">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>
      <button
        type="button"
        className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 text-white shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
        onClick={openFileDialog}
      >
        <ImagePlusIcon size={16} />
      </button>
      <input {...getInputProps()} className="sr-only" />
    </div>
  );
}
