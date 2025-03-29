// Add Friends function
// @ts-nocheck
import { socket, usersDiv } from '/includes/sharedContent'
export function addFriend(name) {
    if (name) {
        if (name.value.trim().length > 3) {
            socket.emit("addFriend", name.value, localStorage.getItem("id"));
            name.value = ''
        } else return
    } else return
}

// display friend in html webpage
export function displayFriend(res, status) {
    usersDiv.innerHTML += `
    <a href="?id=${res[0].ID}"><ul id=""><li class="flex justify-between gap-x-6 py-5"
        >
        <div class="flex min-w-0 gap-x-4">
            <img class="size-12 flex-none rounded-full bg-gray-50" src="https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png" alt="" />
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold">${res[0].Username}</p>
                <!--<p class="mt-1 truncate text-xs/5 text-gray-500">كيف كانت الأحوال</p>-->
            </div>
        </div>

        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">

            <div class="mt-1 flex items-center gap-x-1.5">
                <div id="i${res[0].ID}" class="size-1.5 rounded-full ${status == 1 ? "bg-green-500" : ""}" />
                </div>
                <!--<p class="text-xs/5 text-gray-500" id="${res[0].ID}">${status}</p>-->
            </div>
        </div>
    </li></ul></a>`
    if(document.getElementById("noFriends")) document.getElementById("noFriends").remove();
}

// <p class="text-sm/6 ">{{ person.role }}</p>
// <p class="mt-1 text-xs/5 text-gray-500">
//     اخر ظهور <time>منذ ساعتين</time>
// </p>