import colorama
from colorama import Fore, Back, Style
colorama.init(autoreset=True)

def you_died(why):
    print(why)
    print ("\033[31m" + "GAME OVER" "\033[39m")
    exit(0)


def guard():
    actions_dict = {"check":"You see the guard is still sleeping, you need to get to that door on the right of them. What are you waiting for?",
                    "sneak":"You approach the sleeping guard. You slowly creep by and reach for the door behind them. You open it slowly.",
                    "attack":"You swiftly run towards the sleeping guard and attempt knock them out with the hilt of your new Elven sword. Unfortunately it wasn't hard enough."}

    while True:
        action = input("what do you do? [attack | check | sneak] >").lower()
        if action in actions_dict.keys():
            print(actions_dict[action])
            if action == "sneak":
                print("You're careful not to make a sound. Once the door is opened just wide enough... You slip through the door before the guard realizes it.")
                print("You are now outside of this wretched dungeon and are home free! Huzzah!\n")
                return
            elif action == "attack":
                you_died("The guard awakens with a grunt, and reaches for his sword. Before you're able to react, the world goes dark.")


def blue_door_room():
    treasure_chest = ["diamonds", "gold", "silver", "sword"]
    print("You open the blue door and see a room with a large wooden chest on the left, and a sleeping guard on the right in front another door")
    action = input("What do you do? > ")

    if action.lower() in ["treasure", "chest", "left"]:
        print("It appears this chest is filled with treasure!")

        print("Open it? Press'1'")
        print ("Leave it alone. Press '2'")
        choice = input("> ")

        if choice =="1":
            print ("Let's see what's in here...")
            print("The chest creaks open. You look over to the guard, but luckily they were not awakened by the loud creaking sound.")
            print("You find")

            for treasure in treasure_chest:
                print(treasure)

            print("What do you want to do?")

            num_items_in_chest = len(treasure_chest)

            print(f"Take all {num_items_in_chest} treasure, press '1'")
            print("Leave it, press '2'")

            treasure_choice = input("> ")
            if treasure_choice == "1":
                    treasure_chest.remove("sword")
                    print("\tYou remove the finely made sword from the treasure chest. It's clearly Elven steel!")
                    print("\tYou unsheath the damaged sword you were carrying on your hip, and place it in the empty chest. Your time has ended old friend.")

                    temp_treasure_list = treasure_chest[:]
                    treasure_contents = ", ".join(treasure_chest)
                    print(f"\tYou also receive {treasure_contents}.")

                    for treasure in temp_treasure_list:
                            treasure_chest.remove(treasure)

                    treasure_chest.append("damaged sword")
                    print(f"\tYou slowly close the lid of the chest containing {treasure_chest} for the next adventurer.")
                    print("Now onward to get past the sleeping guard, and the door to freedom.")
            elif treasure_choice == "2":
                        print("There's no need for riches now. I must get past this guard and escape.")
        elif choice == "2":
                print("I can't risk waking the guard. Freedom is the priority here.")
    elif action.lower() in ["guard", "right"]:
            print("Let's see if I can take care of this guard. They're the only thing standing between me and escape from this place!")
    else:
        print("\nYou scan the room looking for other doors or potential exits. You only find the chest to your left and the guard in front of the door on the right. You back out of the room weighing your options.\n")
        return start_adventure()
    guard()
    

def red_door_room():
    print("You slowly open the door. There before you stands an ancient red dragon.")
    print("Its eyes lock onto you as you peer through the open door.")
    print("Do you flee for your life or stay and fight?")

    next_move = input("> ")

    if "flee" in next_move:
        print("You hastily back out of the room and close the door behind you. Fortunately for you the dragon did not give chase.\n")
        start_adventure()
    else:
        print("You reach toward the hilt of your sword and unsheath it. You expected a shining blade to move in front of your vision, but it appears your sword has been badly damaged.")
        you_died("The dragon's maw opens wide and flames pour over the entire room. The world fades to black.")


def get_player_name():
    name = input("What's your name? > ")

    alt_name = "King Baelnar"
    answer = input(f"Your name is {alt_name.upper()}, is that correct? [Y|N] > ")

    if answer.lower() in ["y", "yes"]:
        name = alt_name
        print(f"Of course it's you {name.upper()}, forgotten king of the Frostbeard Clan! Let's escape this place and continue our adventure!\n")

    elif answer.lower() in ["n", "no"]:
        print(f"Very well {name.upper()}. You are a noble knight in your own right. Let's escape this place and start our adventure!\n")

    else:
        print(f"Oh yes of course you are {alt_name.upper()}. He was always so fond of jokes. Let's escape this place and continue our adventure.\n")
        name = alt_name


    return name



def start_adventure():
    print("You find yourself in an empty chamber. The walls are made of rough stone. You see a red door to your left and a blue door to your right.")
    door_picked = input("Do you pick the red door or blue door? >")

    if door_picked.lower() in ["red", "left"]:
        red_door_room()
    elif door_picked.lower() in ["blue", "right"]:
        blue_door_room()
    else:
        print("You wait inside this chamber for a while. Looking for alternative exits. Unfortunately, the two doors before you seem to be the only options.")
        return start_adventure()

def main():

    player_name = get_player_name()
    #what = "knight" 
    #print(f"Your name is {player_name.upper()}. You are a {what}.")

    start_adventure()

    print("\nYou have successfully escaped the dungeon!")
    print(Fore.GREEN + "\nThe End\n")
    print(f"Thanks for playing, {player_name.upper()}")

if __name__ == '__main__':
    main()