/* -------------------[ Site Data ]------------------- */
/* Site version */
const site_version = "0.19.3";

/* Untitled text default */
const editor_untitled = "Untitled";

/* Role type order */
const sidebar_type_order = [
  "Guest",
  "Stranger",
  "Spirit",
  "Item",
  "Prompt"
];

/* Ability icon order */
const editor_ability_icon_order = {
  none: "assets/ability_icons/none.png",
  passive: "assets/ability_icons/passive.png",
  passive_d: "assets/ability_icons/passive_d.png",
  night: "assets/ability_icons/night.png",
  night_d: "assets/ability_icons/night_d.png",
  night_1: "assets/ability_icons/night_1.png",
  night_2: "assets/ability_icons/night_2.png",
  day: "assets/ability_icons/day.png",
  day_d: "assets/ability_icons/day_d.png",
  day_1: "assets/ability_icons/day_1.png",
  day_2: "assets/ability_icons/day_2.png",
};

/* Ability icon names to display in the dropdown */
const editor_ability_icon_labels = {
  none: "None",
  passive: "Passive",
  passive_d: "Passive (💀)",
  night: "Night",
  night_d: "Night (💀)",
  night_1: "Night (1)",
  night_2: "Night (2)",
  day: "Day",
  day_d: "Day (💀)",
  day_1: "Day (1)",
  day_2: "Day (2)"
};

/* Default project data */
const site_project_default = {
  name: editor_untitled,
  author: "",
  icon: "",
  description: ""
};

/* Default role data */
const site_roles_default = {
  /* id should never be left as default, always give each role a random id */
  id: "",
  /* Everything else here can be safely used as-is until the user modifies it */
  name: editor_untitled,
  toplabel: "",
  ability1: "",
  ability2: "",
  ability1_icon: "none",
  ability2_icon: "none",
  ability1_name: "",
  ability2_name: "",
  icon: "",
  type: sidebar_type_order[0],
  activate: "",
  format: false,
  is_vanilla: false,
  tag_friendly: false,
  tag_setup: false,
  tag_preserve: false
};

/* Role colour arrays */
const colour_array = {
  Guest: "--type_guest",
  Stranger: "--type_stranger",
  Spirit: "--type_spirit",
  Item: "--type_item",
  Prompt: "--type_prompt"
};
const colour_array_dark = {
  Guest: "--type_guest_dark",
  Stranger: "--type_stranger_dark",
  Spirit: "--type_spirit_dark",
  Item: "--type_item_dark",
  Prompt: "--type_prompt_dark"
};

/* History for undo / redo limit (important so as to not flood storage) */
const data_history_limit = 30;

/* Cache for CSS styles */
const data_css = getComputedStyle(document.documentElement);

/* Calculate colours light */
//window.addEventListener("DOMContentLoaded", () => {
const colour_guest_hex = data_css.getPropertyValue('--type_guest').trim().replace('#', '');
const colour_guest = new Uint8Array([parseInt(colour_guest_hex.slice(0, 2), 16), parseInt(colour_guest_hex.slice(2, 4), 16), parseInt(colour_guest_hex.slice(4, 6), 16)]);
const colour_stranger_hex = data_css.getPropertyValue('--type_stranger').trim().replace('#', '');
const colour_stranger = new Uint8Array([parseInt(colour_stranger_hex.slice(0, 2), 16), parseInt(colour_stranger_hex.slice(2, 4), 16), parseInt(colour_stranger_hex.slice(4, 6), 16)]);
const colour_spirit_hex = data_css.getPropertyValue('--type_spirit').trim().replace('#', '');
const colour_spirit = new Uint8Array([parseInt(colour_spirit_hex.slice(0, 2), 16), parseInt(colour_spirit_hex.slice(2, 4), 16), parseInt(colour_spirit_hex.slice(4, 6), 16)]);
const colour_item_hex = data_css.getPropertyValue('--type_item').trim().replace('#', '');
const colour_item = new Uint8Array([parseInt(colour_item_hex.slice(0, 2), 16), parseInt(colour_item_hex.slice(2, 4), 16), parseInt(colour_item_hex.slice(4, 6), 16)]);
const colour_prompt_hex = data_css.getPropertyValue('--type_prompt').trim().replace('#', '');
const colour_prompt = new Uint8Array([parseInt(colour_prompt_hex.slice(0, 2), 16), parseInt(colour_prompt_hex.slice(2, 4), 16), parseInt(colour_prompt_hex.slice(4, 6), 16)]);
/* Calculate colours dark */
const colour_guest_dark_hex = data_css.getPropertyValue('--type_guest_dark').trim().replace('#', '');
const colour_guest_dark = new Uint8Array([parseInt(colour_guest_dark_hex.slice(0, 2), 16), parseInt(colour_guest_dark_hex.slice(2, 4), 16), parseInt(colour_guest_dark_hex.slice(4, 6), 16)]);
const colour_stranger_dark_hex = data_css.getPropertyValue('--type_stranger_dark').trim().replace('#', '');
const colour_stranger_dark = new Uint8Array([parseInt(colour_stranger_dark_hex.slice(0, 2), 16), parseInt(colour_stranger_dark_hex.slice(2, 4), 16), parseInt(colour_stranger_dark_hex.slice(4, 6), 16)]);
const colour_spirit_dark_hex = data_css.getPropertyValue('--type_spirit_dark').trim().replace('#', '');
const colour_spirit_dark = new Uint8Array([parseInt(colour_spirit_dark_hex.slice(0, 2), 16), parseInt(colour_spirit_dark_hex.slice(2, 4), 16), parseInt(colour_spirit_dark_hex.slice(4, 6), 16)]);
const colour_item_dark_hex = data_css.getPropertyValue('--type_item_dark').trim().replace('#', '');
const colour_item_dark = new Uint8Array([parseInt(colour_item_dark_hex.slice(0, 2), 16), parseInt(colour_item_dark_hex.slice(2, 4), 16), parseInt(colour_item_dark_hex.slice(4, 6), 16)]);
const colour_prompt_dark_hex = data_css.getPropertyValue('--type_prompt_dark').trim().replace('#', '');
const colour_prompt_dark = new Uint8Array([parseInt(colour_prompt_dark_hex.slice(0, 2), 16), parseInt(colour_prompt_dark_hex.slice(2, 4), 16), parseInt(colour_prompt_dark_hex.slice(4, 6), 16)]);
//});

/* -------------------[ General Variables ]------------------- */
/* List of all roles */
let data_roles = [];
/* Project metadata */
let data_project = site_project_default;
/* Role selected to be edited right now */
let sidebar_selected = null;
let sidebar_mode = "role";
/* Is the sidebar collapsed right now? */
let sidebar_collapsed_main = false;
/* Text searched for in the sidebar search input */
let sidebar_search = "";
/* Whether our data is up-to-date with local storage */
let data_saved = false;
/* Variable for collapsing role type sections */
let sidebar_collapsed_categories = {
  Guest: false,
  Stranger: false,
  Spirit: false,
  Item: false,
  Prompt: false
};
/* Cache for role icons so they don't render jittery with formatting */
const data_roles_icon_cache = new Map();
/* History for undo / redo actions */
let data_history_undo = [];
let data_history_redo = [];
/* History data for last snapshot saved */
let data_history_last = "";

/* -------------------[ Cache Objects In Variables ]------------------- */
/* Custom modal cache */
const element_modal = {
  main: document.getElementById("modal"),
  msg: document.getElementById("modal_message"),
  cancel: document.getElementById("modal_cancel"),
  ok: document.getElementById("modal_ok"),
  add_role: document.getElementById("modal_add_role"),
  new_role: document.getElementById("modal_new_role"),
  load_vanilla: document.getElementById("modal_load_vanilla"),
  vanilla_select_container: document.getElementById("modal_vanilla_select_container"),
  vanilla_select: document.getElementById("modal_vanilla_select"),
  vanilla_icon: document.getElementById("modal_vanilla_icon")
};

/* Vanilla roles cache (this is updated in data_roles_vanilla_load) */
let data_roles_vanilla = null;

/* Everything else */
const element_single_role_name = document.getElementById("single_role_name");
const element_single_role_toplabel = document.getElementById("single_role_toplabel");
const element_single_role_ability1 = document.getElementById("single_role_ability1");
const element_single_role_ability2 = document.getElementById("single_role_ability2");
const element_single_role_ability1_icon = document.getElementById("single_role_ability1_icon");
const element_single_role_ability2_icon = document.getElementById("single_role_ability2_icon");
const element_single_role_ability1_type = document.getElementById("single_role_ability1_type");
const element_single_role_ability2_type = document.getElementById("single_role_ability2_type");
const element_single_role_ability1_name = document.getElementById("single_role_ability1_name");
const element_single_role_ability2_name = document.getElementById("single_role_ability2_name");
const element_single_role_icon = document.getElementById("single_role_icon");
const element_single_role_type = document.getElementById("single_role_type");
const element_single_role_activate = document.getElementById("single_role_activate");
const element_single_role_tag_friendly = document.getElementById("single_role_tag_friendly");
const element_single_role_tag_setup = document.getElementById("single_role_tag_setup");
const element_single_role_tag_preserve = document.getElementById("single_role_tag_preserve");
const element_single_role_format = document.getElementById("single_role_format");
const element_single_role_delete = document.getElementById("single_role_delete");
const element_sidebar_main = document.getElementById("sidebar_main");
const element_sidebar_list = document.getElementById("sidebar_list");
const element_sidebar_project = document.getElementById("sidebar_project");
const element_sidebar_add = document.getElementById("sidebar_add");
const element_sidebar_save = document.getElementById("sidebar_save");
const element_sidebar_undo = document.getElementById("sidebar_undo");
const element_sidebar_redo = document.getElementById("sidebar_redo");
const element_sidebar_search = document.getElementById("sidebar_search");
const element_sidebar_toggle = document.getElementById("sidebar_toggle");
const element_editor_main = document.getElementById("editor_main");
const element_editor_marker = document.getElementById("editor_marker");
const element_editor_input = document.getElementById("editor_input");
const element_editor_icon_preview = document.getElementById("editor_icon_preview");
const element_editor_icon_upload = document.getElementById("editor_icon_upload");
const element_editor_icon_placeholder = document.getElementById("editor_icon_placeholder");
const element_editor_card = document.getElementById("editor_card");
const element_editor_footer_year = document.getElementById("editor_footer_year");
const element_editor_footer_version = document.getElementById("editor_footer_version");
const element_editor_project = document.getElementById("editor_project");
const element_editor_project_name = document.getElementById("editor_project_name");
const element_editor_project_author = document.getElementById("editor_project_author");
const element_editor_project_description = document.getElementById("editor_project_description");
const element_editor_project_icon_input = document.getElementById("editor_project_icon_input");
const element_editor_project_icon_upload = document.getElementById("editor_project_icon_upload");
const element_editor_project_icon_preview = document.getElementById("editor_project_icon_preview");
const element_editor_project_icon_placeholder = document.getElementById("editor_project_icon_placeholder");
const element_editor_project_export_cards = document.getElementById("editor_project_export_cards");
const element_editor_project_export_sheet = document.getElementById("editor_project_export_sheet");
const element_editor_project_export_json = document.getElementById("editor_project_export_json");
const element_editor_project_import_json = document.getElementById("editor_project_import_json");
const element_editor_project_import_json_file = document.getElementById("editor_project_import_json_file");

/* -------------------[ Load Vanilla Roles ]------------------- */
async function data_roles_vanilla_load() {
  if (data_roles_vanilla !== null) {
    return data_roles_vanilla;
  }
  try {
    const response = await fetch("assets/vanilla_roles/all.json");
    if (!response.ok) {
      modal_show_alert("Failed to vanilla roles!\nError C-1: Missed response."); return;
    }
    const parsed = await response.json();
    if (!Array.isArray(parsed)) {
      modal_show_alert("Failed to vanilla roles!\nError C-2: Role data is not loaded as an array."); return;
    }
    data_roles_vanilla = parsed;
    return data_roles_vanilla;
  } catch (err) {
    modal_show_alert("Failed to vanilla roles!\nError C-3: Failed."); return;
  }
}

/* -------------------[ Update Save Button Text ]------------------- */
function sidebar_render_save() {
  if (data_saved) {
    element_sidebar_save.textContent = "✓ Saved";
  } else {
    element_sidebar_save.textContent = "Save";
  }
}

/* -------------------[ Create & Render Sidebar ]------------------- */
function sidebar_render() {
  const list = element_sidebar_list;
  list.innerHTML = "";

  element_sidebar_project.classList.toggle("on", sidebar_mode === "project");

  /* Hierarchy for role sorting */
  const type_order = sidebar_type_order;
  data_roles_order();

  /* Find each role to render (filter by sidebar_search) */
  type_order.forEach(type => {
    const roles_of_type = data_roles.map((role, index) => ({ role, index })).filter(item => {
      const role = item.role;
      const matchesType = (role.type || sidebar_type_order[0]) === type;
      if (!matchesType) return false;
      if (!sidebar_search) return true;
      const snoopingFor = (role.name + " " + role.toplabel + " " + role.ability1 + " " + role.ability2 + " " + role.ability1_name + " " + role.ability2_name).toLowerCase();
      return snoopingFor.includes(sidebar_search);
    });

    /* If no roles are of this role type, we don't render this category at all */
    if (roles_of_type.length === 0) return;

    /* Create header text for this role type category */
    const header = document.createElement("div");
    header.className = "sidebar_type";
    /* Add the little arrow to indicate when the category is collapsed */
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "▼";
    if (sidebar_collapsed_categories[type]) {
      arrow.classList.add("collapsed");
    }
    header.appendChild(arrow);
    header.appendChild(document.createTextNode(" " + type));
    /* Code for clicking to collapse / uncollapse the section */
    header.onclick = () => {
      sidebar_collapsed_categories[type] = !sidebar_collapsed_categories[type];
      const arrow = header.querySelector(".arrow");
      arrow.classList.toggle("collapsed");
      setTimeout(() => {
        sidebar_render();
      }, 200);
    };
    list.appendChild(header);

    /* Don't render these roles if the section is collapsed */
    if (sidebar_collapsed_categories[type]) return;

    /* Render all the roles in this category */
    roles_of_type.forEach(({ role, index }) => {
      const div = document.createElement("div");
      div.className = "sidebar_entry";

      /* Add classes for CSS */
      div.classList.add(`sidebar_type_${(role.type || sidebar_type_order[0]).toLowerCase()}`);

      if (role.id === sidebar_selected) {
        div.classList.add("selected");
      }

      /* Delete button for this role */
      /*const sidebar_delete = document.createElement("button");
      sidebar_delete.classList.add("hidden");
      sidebar_delete.textContent = "-";
      sidebar_delete.setAttribute("aria-label", "Delete Role");
      sidebar_delete.classList.add("sidebar_delete");
      sidebar_delete.onclick = async (e) => {
        e.stopPropagation();
        const ok = await modal_show_confirm("Delete this role?"); if (!ok) return;
        const element = e.target.closest(".sidebar_entry");
        data_roles_delete(element);
      };
      if (role.id === sidebar_selected) {
        sidebar_delete.classList.remove("hidden");
      }*/

      const container = document.createElement("div");
      container.className = "sidebar_container";

      /* Add the role icon display */
      if (role.icon) {
        const icon = document.createElement("img");
        icon.className = "sidebar_icon";
        icon.alt = `${role.name} Icon`;
        data_roles_icon_get(role, (src) => {
          if (src) icon.src = src;
        });
        container.appendChild(icon);
      }

      const name = document.createElement("span");
      name.textContent = role.name;
      name.className = "sidebar_name";

      /* Render a star for unedited vanilla roles */
      const marker = document.createElement("span");
      marker.className = "sidebar_marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = "";
      if (role.is_vanilla) {
        marker.textContent = "★";
      }
      div.appendChild(marker);

      /* This is the order of how everything displays in one sidebar slot */
      /*div.appendChild(sidebar_delete);*/
      div.appendChild(container);
      div.appendChild(name);

      /* Click this line to select this role */
      div.onclick = () => {
        sidebar_mode = "role";
        element_editor_project.classList.add("hidden");
        sidebar_selected = role.id;
        sidebar_render();
        data_roles_load();
      };

      list.appendChild(div);
    });
  });
}

/* -------------------[ Generate Unique UUID ]------------------- */
function data_roles_uuid() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : 'id_' + Math.random().toString(16).slice(2) + Date.now();
}

/* -------------------[ Validate Any File Name ]------------------- */
function data_filename_safe(name, fallback = editor_untitled) {
  const safe = String(name || "")
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "");

  return safe || fallback;
}

/* -------------------[ Load From Local Storage ]------------------- */
function data_storage_load() {
  const saved = localStorage.getItem("data_storage");
  if (!saved) return;

  /* Old loading code */
  /*data_saved = true;
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      data_roles = parsed;
    } else {
      data_roles = parsed.roles || [];
      data_project = parsed.project || data_project;
    }
  } catch (e) {
    data_roles = [];
  }*/

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      data_roles = parsed;
      data_project = structuredClone(site_project_default);
    } else if (parsed && typeof parsed === "object") {
      data_roles = Array.isArray(parsed.roles) ? parsed.roles : [];
      data_project = {
        ...site_project_default,
        ...(parsed.project || {})
      };
    } else {
      data_roles = [];
      data_project = structuredClone(site_project_default);
    }
    data_saved = true;
  } catch (e) {
    data_roles = [];
    data_project = structuredClone(site_project_default);
    data_saved = false;
  }

}

/* -------------------[ Export As JSON ]------------------- */
function export_json() {
  /* Creates the object to be included in the export */
  function create_export_role(role, icon_override = role.icon) {
    const export_role = {};
    /* Go through each piece of data to see if we need it exported (name, ability1, etc) */
    Object.keys(site_roles_default).forEach((key) => {
      /* Never export these pieces of information, they are not about the role itself and only used to help the editor function */
      if (key === "id" || key === "format") return;
      /* Get the formatted version of the icon, if needed */
      const value = key === "icon" ? icon_override : role[key];
      /* Compare with site_roles_default (we only need to export values that are not the default (ie, they have been changed by the user)) */
      if (value === site_roles_default[key]) return;
      /* If all checks pass, this is a value we will export */
      export_role[key] = value;
    });
    return export_role;
  }
  /* Convert role data into usable objects */
  const export_json_data = data_roles.map(role => {
    /* Get the correct value for exporting the icon */
    return new Promise((resolve) => {
      /* If there's no icon, or it's not being formatted, export normally */
      if (!role.icon || !role.format) {
        resolve(create_export_role(role));
        return;
      }
      /* Otherwise, format the icon before exporting */
      data_roles_format(role.icon, role.type, (formattedIcon) => {
        resolve(create_export_role(role, formattedIcon));
      });
    });
  });
  /* Compare with site_project_default (we only need to export values that are not the default (ie, they have been changed by the user)) */
  function create_export_project(project) {
    const export_project = {};
    Object.keys(site_project_default).forEach((key) => {
      const value = project[key];
      if (value === site_project_default[key]) return;
      export_project[key] = value;
    });
    return export_project;
  }
  /* Wait for icon formatting to finish */
  Promise.all(export_json_data).then((data_roles_export) => {
    const project_export = create_export_project(data_project);
    /* Make the JSON file */
    const url = URL.createObjectURL(new Blob([JSON.stringify({ project: project_export, roles: data_roles_export }, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = data_filename_safe(data_project.name) + ".json"
    a.click();
    URL.revokeObjectURL(url);
  });
}

/* -------------------[ Import From JSON ]------------------- */
function import_json(file) {
  if (!file) return;
  const sidebar_file_reader = new FileReader();
  sidebar_file_reader.onload = function (e) {
    try {
      /* Convert JSON data to a readable object */
      const parsed = JSON.parse(e.target.result);
      let imported_roles = parsed;
      let imported_project = {};
      if (!Array.isArray(parsed)) {
        imported_roles = parsed.roles || [];
        imported_project = parsed.project || {};
      }
      if (!Array.isArray(imported_roles)) {
        return;
      }
      if (imported_roles.length > 1000) { modal_show_alert("Failed to load file!\nError B-5: Too many roles at once."); return; }

      data_history_push();

      /* Set all the data */
      const clone = typeof structuredClone === "function" ? structuredClone(site_roles_default) : JSON.parse(JSON.stringify(site_roles_default));
      data_roles = imported_roles.map(role => ({
        ...clone,
        ...role,
        id: data_roles_uuid()
      }));
      data_project = typeof structuredClone === "function" ? structuredClone({ ...site_project_default, ...imported_project }) : JSON.parse(JSON.stringify({ ...site_project_default, ...imported_project }));
      /* Load everything else (now role data is done) */
      editor_unsaved();
      data_roles_icon_cache.clear();
      sidebar_render();
      editor_project_open();
    } catch (err) {
      modal_show_alert("Failed to load file! Please try another file.\nError B-4: File JSON is invalid.");
    }
  };
  sidebar_file_reader.readAsText(file);
}

/* -------------------[ Get Selected Role ]------------------- */
function data_roles_get() {
  return data_roles.find(r => r.id === sidebar_selected);
}

/* -------------------[ Add New Role (User Choice Modal) ]------------------- */
async function data_roles_add_modal() {
  const choice = await modal_show_add_role();
  /* Add a blank, new role */
  if (choice === "new") {
    data_roles_add_new();
    return;
  }
  /* Load a role from the vanilla set */
  if (choice === "vanilla") {
    const vanilla_roles = await data_roles_vanilla_load();
    if (!vanilla_roles) return;
    const role = await modal_show_vanilla_selector(vanilla_roles);
    if (role) {
      data_roles_add_vanilla(role);
    }
  }
}

/* -------------------[ Add New Role ]------------------- */
function data_roles_add_new() {
  data_history_push();
  /* Choose what type the role will be created as (guest by default) */
  const default_role_type = sidebar_selected !== null ? (data_roles_get()?.type || sidebar_type_order[0]) : sidebar_type_order[0];
  /* This adds the actual role with all default data */
  const clone = typeof structuredClone === "function" ? structuredClone(site_roles_default) : JSON.parse(JSON.stringify(site_roles_default));
  data_roles.push({
    ...clone,
    id: data_roles_uuid(),
    type: default_role_type
  });
  sidebar_mode = "role";
  sidebar_selected = data_roles[data_roles.length - 1].id;
  element_editor_project.classList.add("hidden");
  sidebar_render();
  editor_unsaved();
  data_roles_load();
}

/* -------------------[ Add Vanilla Role ]------------------- */
function data_roles_add_vanilla(vanilla_role) {
  if (!vanilla_role) return;
  data_history_push();
  /* Load default role data, because the json file we're reading will only override some of it */
  const clone = typeof structuredClone === "function" ? structuredClone(site_roles_default) : JSON.parse(JSON.stringify(site_roles_default));
  /* Now generate the data of this new role we're adding, with any custom data this role needs taking priority over the default data */
  const role = {
    ...clone,
    ...vanilla_role,
    id: data_roles_uuid(),
    is_vanilla: true
  };
  /* Finish up by adding this role to the system */
  data_roles.push(role);
  sidebar_mode = "role";
  sidebar_selected = role.id;
  element_editor_project.classList.add("hidden");
  sidebar_render();
  editor_unsaved();
  data_roles_load();
}

/* -------------------[ Delete Role ]------------------- */
function data_roles_delete(element) {
  if (!element) return;

  const roleId = sidebar_selected;
  if (!roleId) return;

  data_history_push();

  const on_transition_end = (e) => {
    if (e.propertyName !== "opacity") return;
    element.removeEventListener("transitionend", on_transition_end);
    /* Store the index of the role we deleted */
    const deleted = data_roles.findIndex(r => r.id === roleId);
    /* Clear it from the icon cache */
    data_roles_format_cache_clear(data_roles[deleted]?.id);
    /* Properly delete the role after the animation plays */
    data_roles = data_roles.filter(r => r.id !== roleId);
    /* Select a new role */
    if (data_roles.length === 0) {
      sidebar_selected = null;
      editor_project_open();
    } else {
      sidebar_selected = data_roles[Math.max(0, deleted - 1)]?.id || data_roles[0].id;
    }
    /* Re-render and set some variables */
    sidebar_render();
    editor_unsaved();
    if (sidebar_selected) {
      data_roles_load();
    }
  };
  element.addEventListener("transitionend", on_transition_end);
  element.classList.add("removing");
}

/* -------------------[ Mark Role As Edited (Non-Vanilla) ]------------------- */
function data_roles_edited() {
  const role = data_roles_get();
  if (!role) return;
  editor_card_render();
  if (!role.is_vanilla) return;
  role.is_vanilla = false;
}

/* -------------------[ Load Roles ]------------------- */
function data_roles_load() {
  const role = data_roles_get();
  if (!role) {
    editor_project_open();
    return;
  }
  element_single_role_name.value = role.name;
  element_single_role_toplabel.value = role.toplabel;
  element_single_role_activate.value = role.activate;
  element_single_role_ability1.value = role.ability1;
  element_single_role_ability2.value = role.ability2;
  element_single_role_ability1_type.value = role.ability1_icon || "none";
  element_single_role_ability2_type.value = role.ability2_icon || "none";
  element_single_role_ability1_icon.src = editor_ability_icon_order[role.ability1_icon] || editor_ability_icon_order.none;
  element_single_role_ability2_icon.src = editor_ability_icon_order[role.ability2_icon] || editor_ability_icon_order.none;
  element_single_role_ability1_name.value = role.ability1_name;
  element_single_role_ability2_name.value = role.ability2_name;
  element_single_role_type.value = role.type || sidebar_type_order[0];
  element_single_role_tag_friendly.checked = role.tag_friendly;
  element_single_role_tag_setup.checked = role.tag_setup;
  element_single_role_tag_preserve.checked = role.tag_preserve;
  element_single_role_format.classList.toggle("on", role.format);
  element_editor_marker.classList.toggle("hidden", !role?.is_vanilla);

  editor_icon_render(role.icon);
  element_editor_input.classList.toggle("hidden", false);
  /* Update input and textarea highlight colour */
  const colour = data_css.getPropertyValue(colour_array[role.type] || "--type_guest").trim();
  document.documentElement.style.setProperty("--type_selected", colour);
  const colour_dark = data_css.getPropertyValue(colour_array_dark[role.type] || "--type_guest_dark").trim();
  document.documentElement.style.setProperty("--type_selected_dark", colour_dark);
  editor_enable_check();
  editor_card_render();
}

/* -------------------[ Mark Data As Unsaved ]------------------- */
function editor_unsaved() {
  data_saved = false;
  sidebar_render_save();
}

/* -------------------[ Project Metadata Editor Open ]------------------- */
function editor_project_open() {
  sidebar_mode = "project";
  sidebar_selected = null;
  sidebar_render();
  element_editor_project_name.value = data_project.name;
  element_editor_project_author.value = data_project.author;
  element_editor_project_description.value = data_project.description;
  editor_project_icon_render(data_project.icon);
  element_editor_project.classList.remove("hidden");
  element_editor_input.classList.add("hidden");

  const colour = data_css.getPropertyValue("--type_guest").trim();
  document.documentElement.style.setProperty("--type_selected", colour);
  const colour_dark = data_css.getPropertyValue("--type_guest_dark").trim();
  document.documentElement.style.setProperty("--type_selected_dark", colour_dark);
}

/* -------------------[ Project Metadata Editor Update Icon ]------------------- */
function editor_project_icon_render(icon) {
  if (!icon) {
    element_editor_project_icon_preview.src = "";
    element_editor_project_icon_preview.style.display = "none";
    element_editor_project_icon_placeholder.style.display = "block";
    element_editor_project_icon_upload.classList.remove("has_icon");
    return;
  }
  element_editor_project_icon_preview.src = icon;
  element_editor_project_icon_preview.style.display = "block";
  element_editor_project_icon_placeholder.style.display = "none";
  element_editor_project_icon_upload.classList.add("has_icon");
}

/* -------------------[ Handle File Reader For Image Upload ]------------------- */
function editor_icon_upload(file, onSuccess) {
  /* Initial error checks */
  if (!file) { modal_show_alert("Failed to load file! Please try another file.\nError A-1: No file uploaded."); return; }
  if (!file.type) { modal_show_alert("Failed to load file! Please try another file.\nError B-1: File type data not found."); return; }
  if (!file.type.startsWith("image/")) { modal_show_alert("Failed to load file! Please try another file.\nError B-2: Not a valid image file type."); return; }
  if (file.size > 4 * 1024 * 1024) { modal_show_alert("Failed to load file! Please try another file.\nError B-3: File size is dangerously large (>4MB)."); return; }
  /* Create the file reader */
  const editor_file_reader = new FileReader();
  editor_file_reader.onload = async function (e) {
    const image = new Image();
    image.src = e.target.result;
    image.onerror = function () { modal_show_alert("Failed to load file! Please try another file.\nError A-3: Unknown - browser failed to decode image."); };
    image.onload = function () {
      /* Save old icon state to history */
      data_history_push();
      /* Define the size (width / height) of the converted image */
      const target_size = 1024;
      /* Create our canvas */
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = target_size;
      canvas.height = target_size;
      /* Fill the background (important for transparency images) */
      ctx.clearRect(0, 0, target_size, target_size);
      /* Crop the image to square */
      const size = Math.min(image.width, image.height);
      const sx = (image.width - size) / 2;
      const sy = (image.height - size) / 2;
      /* Draw the image, scaled to target_size */
      ctx.drawImage(image, sx, sy, size, size, 0, 0, target_size, target_size);
      const croppedDataUrl = canvas.toDataURL("image/webp");
      onSuccess(croppedDataUrl);
    }
  };
  /* File reader error message */
  editor_file_reader.onerror = function () {
    modal_show_alert("Failed to load file! Please try another file.\nError A-2: Unknown - browser failed to read file.");
  };
  editor_file_reader.readAsDataURL(file);
}

/* -------------------[ Show / Hide Stuff For Icon Upload ]------------------- */
function editor_icon_render(icon) {
  const role = data_roles_get();
  if (!role) return;
  /* Check if we don't have an icon */
  if (!icon) {
    element_editor_icon_preview.src = "";
    element_editor_icon_preview.style.display = "none";
    element_editor_icon_placeholder.style.display = "block";
    element_editor_icon_upload.classList.remove("has_icon");
    return;
  }
  /* Format the icon */
  if (role.format) {
    data_roles_format(icon, role.type, (newIcon) => {
      element_editor_icon_preview.src = newIcon;
    });
  } else {
    element_editor_icon_preview.src = icon;
  }
  /* Display stuff */
  element_editor_icon_preview.style.display = "block";
  element_editor_icon_placeholder.style.display = "none";
  element_editor_icon_upload.classList.add("has_icon");
}

/* -------------------[ Initiate Ability Icon Selector ]------------------- */
function editor_ability_icon_init(select) {
  select.innerHTML = "";
  Object.keys(editor_ability_icon_order).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = editor_ability_icon_labels[key] || key;
    select.appendChild(opt);
  });
}

/* -------------------[ Force Enable All Inputs ]------------------- */
function editor_enable_force() {
  const role = data_roles_get();
  if (!role) return;

  element_single_role_name.disabled = false
  element_single_role_toplabel.disabled = false
  element_single_role_ability1_type.disabled = false
  element_single_role_ability1_name.disabled = false
  element_single_role_ability1_icon.classList.remove("disabled");
  element_single_role_ability1.disabled = false
  element_single_role_ability2_type.disabled = false
  element_single_role_ability2_name.disabled = false
  element_single_role_ability2_icon.classList.remove("disabled");
  element_single_role_ability2.disabled = false
  element_single_role_icon.disabled = false
  element_single_role_type.disabled = false
  element_single_role_activate.disabled = false
  element_single_role_format.disabled = false

  element_single_role_tag_friendly.disabled = false;
  element_single_role_tag_setup.disabled = false;
  element_single_role_tag_preserve.disabled = false;
  element_single_role_tag_friendly.classList.remove("disabled");
  element_single_role_tag_setup.classList.remove("disabled");
  element_single_role_tag_preserve.classList.remove("disabled");

}

/* -------------------[ Check To Enable / Disable Ability Inputs ]------------------- */
function editor_enable_check() {
  const role = data_roles_get();
  if (!role) return;

  /* Enable everyting first*/
  editor_enable_force();

  /* Role type */
  const is_item = role.type === "Item";
  const is_prompt = role.type === "Prompt";
  const is_stranger = role.type === "Stranger";
  /* Disable ability text if type is set to "none" */
  const is_ability1_none = element_single_role_ability1_type.value === "none";
  const is_ability2_none = element_single_role_ability2_type.value === "none";
  /* Disable ability icons for prompts & ability 2 disabled for items */
  const ability1_icon_disabled = is_prompt;
  const ability2_icon_disabled = is_item || is_prompt;
  /* Disable text inputs if icon is set to "none" and it's possible to change */
  const ability1_disabled = !ability1_icon_disabled && is_ability1_none;
  const ability2_disabled = !ability2_icon_disabled && is_ability2_none;
  /* Apply disabled & enabled states */
  element_single_role_ability1.disabled = ability1_disabled || is_prompt;
  element_single_role_ability2.disabled = ability2_disabled || is_prompt || is_item;
  element_single_role_ability1_type.disabled = ability1_icon_disabled;
  element_single_role_ability2_type.disabled = ability2_icon_disabled;
  element_single_role_ability1_icon.classList.toggle("disabled", ability1_icon_disabled || is_ability1_none);
  element_single_role_ability2_icon.classList.toggle("disabled", ability2_icon_disabled || is_ability2_none);
  element_single_role_ability1_name.disabled = ability1_icon_disabled || is_ability1_none || is_item;
  element_single_role_ability2_name.disabled = ability2_icon_disabled || is_ability2_none;
  element_single_role_toplabel.disabled = !(is_stranger || is_prompt || is_item);
  /* Role tags */
  element_single_role_tag_friendly.disabled = is_item || is_prompt;
  element_single_role_tag_setup.disabled = is_item || is_prompt;
  element_single_role_tag_preserve.disabled = is_item || is_prompt;
  element_single_role_tag_friendly.classList.toggle("disabled", is_item || is_prompt);
  element_single_role_tag_setup.classList.toggle("disabled", is_item || is_prompt);
  element_single_role_tag_preserve.classList.toggle("disabled", is_item || is_prompt);

  /* Vanilla roles (disable EVERYTHING) */
  if (role.is_vanilla) {
    element_single_role_name.disabled = true
    element_single_role_toplabel.disabled = true
    element_single_role_ability1_type.disabled = true
    element_single_role_ability1_name.disabled = true
    element_single_role_ability1_icon.classList.add("disabled");
    element_single_role_ability1.disabled = true
    element_single_role_ability2_type.disabled = true
    element_single_role_ability2_name.disabled = true
    element_single_role_ability2_icon.classList.add("disabled");
    element_single_role_ability2.disabled = true
    element_single_role_icon.disabled = true
    element_single_role_type.disabled = true
    element_single_role_activate.disabled = true
    element_single_role_format.disabled = true
    /* Tags */
    element_single_role_tag_friendly.disabled = true;
    element_single_role_tag_setup.disabled = true;
    element_single_role_tag_preserve.disabled = true;
    element_single_role_tag_friendly.classList.add("disabled");
    element_single_role_tag_setup.classList.add("disabled");
    element_single_role_tag_preserve.classList.add("disabled");
  }
}

/* -------------------[ Clear Formatted Icon Cache ]------------------- */
function data_roles_format_cache_clear(roleId) {
  for (const key of data_roles_icon_cache.keys()) {
    if (key.startsWith(roleId + "_")) {
      data_roles_icon_cache.delete(key);
    }
  }
}

/* -------------------[ Role Icon Formatting ]------------------- */
function data_roles_format(imageSrc, roleType, callback) {
  const icon = new Image();
  icon.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = icon.width;
    canvas.height = icon.height;
    ctx.drawImage(icon, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    /* Role Colours */
    let base = colour_guest;
    if (roleType === "Stranger") base = colour_stranger;
    else if (roleType === "Spirit") base = colour_spirit;
    else if (roleType === "Item") base = colour_item;
    else if (roleType === "Prompt") base = colour_prompt;
    let base_dark = colour_guest_dark;
    if (roleType === "Stranger") base_dark = colour_stranger_dark;
    else if (roleType === "Spirit") base_dark = colour_spirit_dark;
    else if (roleType === "Item") base_dark = colour_item_dark;
    else if (roleType === "Prompt") base_dark = colour_prompt_dark;
    /* Start going through each pixel of the image */
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      /* Check if the pixel is transparent in any way (skip it) */
      if (data[i + 3] < 255) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
        continue;
      }
      /* Calculate brightness. 0 = dark, 1 = light */
      const brightness = (r + g + b) / (255 * 3);
      const target = brightness > 0.55 ? base : base_dark;
      data[i] = target[0];
      data[i + 1] = target[1];
      data[i + 2] = target[2];
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    callback(canvas.toDataURL("image/webp"));
  };
  icon.src = imageSrc;
}

/* -------------------[ Export Scenario Sheet ]------------------- */
async function export_sheet() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  /* A4 paper ratio: 210 x 297 centimetres */
  /* These values should match the ratio */
  canvas.width = 210 * 10;
  canvas.height = 297 * 10;
  /* Rendering values */
  const padding = 65;
  const columns = 2;
  const columnGap = 20;
  const columnWidth = (canvas.width - (padding * 2) - columnGap) / columns;
  const rowHeight = 220;
  /* Black background */
  ctx.fillStyle = data_css.getPropertyValue("--black").trim();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  /* Render roles */
  let x = padding;
  let columnNumber = 0;
  let y = padding;
  for (let i = 0; i < data_roles.length; i++) {
    const role = data_roles[i];
    await export_sheet_role(ctx, role, x, y, columnWidth, rowHeight);
    x += columnWidth + columnGap;
    columnNumber++;
    if (columnNumber >= columns) {
      columnNumber = 0;
      y += rowHeight;
      x = padding;
    }
  }
  /* Download file */
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = data_filename_safe(data_project.name) + ".png"
  a.click();
}
async function export_sheet_role(ctx, role, x, y, width, height) {
  /* Rendering values */
  const iconSize = 180;
  const gap = 20;
  const textX = x + iconSize + gap;
  const bodySize = 25;
  const headerSize = 52;
  const abilityIconSize = 75;
  /* Role icon */
  let iconSrc = role.icon || null;
  if (role.icon && role.format) {
    iconSrc = await new Promise(res =>
      data_roles_format(role.icon, role.type, res)
    );
  }
  if (iconSrc) {
    try {
      const img = await export_cards_load_image(iconSrc);
      ctx.drawImage(img, x, y, iconSize, iconSize);
    } catch { }
  }
  /* Role name */
  const roleColours = {
    Guest: "#" + colour_guest_hex,
    Stranger: "#" + colour_stranger_hex,
    Spirit: "#" + colour_spirit_hex,
    Item: "#" + colour_item_hex,
    Prompt: "#" + colour_prompt_hex
  };
  ctx.fillStyle = roleColours[role.type] || data_css.getPropertyValue("--white").trim();
  ctx.font = `${headerSize}px TGPHeader, sans-serif`;
  ctx.textAlign = "left";
  ctx.fillText(role.name || "", textX, y + headerSize);
  /* Ability 1 */
  let abilityY = y + headerSize + gap;
  if (role.ability1_icon && role.ability1_icon !== "none") {
    const icon = editor_ability_icon_order[role.ability1_icon];
    if (icon) {
      const img = await export_cards_load_image(icon);
      ctx.drawImage(img, textX, abilityY, abilityIconSize, abilityIconSize);
      ctx.fillStyle = data_css.getPropertyValue("--white").trim();
      ctx.font = `${bodySize}px TGPBody, sans-serif`;
      ctx.textAlign = "left";
      /* +6 for the y position is kind of cheating, but if it becomes an issue I'll improve it later. It's just because of weird font sizing. */
      export_cards_wrap_justify(ctx, role.ability1 || "", textX + abilityIconSize + gap, abilityY + bodySize + 6, width - abilityIconSize - iconSize - bodySize - gap, bodySize * 1.35, false);
    }
  }
  abilityY += bodySize * 1.35;
  /* Ability 2 */
  if (role.ability2_icon && role.ability2_icon !== "none") {
    const icon = editor_ability_icon_order[role.ability2_icon];
    if (icon) {
      const img = await export_cards_load_image(icon);
      ctx.drawImage(img, textX, abilityY, abilityIconSize, abilityIconSize);
      ctx.fillStyle = data_css.getPropertyValue("--white").trim();
      ctx.font = `${bodySize}px TGPBody, sans-serif`;
      ctx.textAlign = "left";
      /* +6 for the y position is kind of cheating, but if it becomes an issue I'll improve it later. It's just because of weird font sizing. */
      export_cards_wrap_justify(ctx, role.ability2 || "", textX + abilityIconSize + gap, abilityY + bodySize + 6, width - abilityIconSize - iconSize - bodySize - gap, bodySize * 1.35, false);
    }
  }
}

/* -------------------[ Render Card Preview ]------------------- */
async function editor_card_render() {
  const role = data_roles_get();
  if (!role) {
    element_editor_card.src = "";
    element_editor_card.style.display = "none";
    return;
  }
  try {
    const pngData = await export_cards_render(role, 0.15);
    element_editor_card.src = pngData;
    element_editor_card.style.display = "block";
  } catch (err) {
    console.error("Failed to render card preview:", err);
    element_editor_card.src = "";
    element_editor_card.style.display = "none";
  }
}

/* -------------------[ Export PNG Cards ]------------------- */
async function export_cards() {
  const zip = new JSZip();
  for (const role of data_roles) {
    const pngData = await export_cards_render(role);
    const base64 = pngData.split(",")[1];
    const safeName = role.name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
    zip.file(`${safeName || editor_untitled}.png`, base64, { base64: true });
  }
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, data_filename_safe(data_project.name) + ".zip"
  );
}

/* -------------------[ Render Role Card (Main) ]------------------- */
async function export_cards_render(role, s = 1) {

  return new Promise(async (resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    /* Bridge card ratio: 3.5 x 2.25 inches */
    /* These values should match the ratio */
    canvas.width = 3.5 * 1200 * s;
    canvas.height = 2.25 * 1200 * s;
    /* Rendering values */
    const paddingX = 150 * s;
    const borderDistance = 80 * s;
    const borderWobble = 16 * s;
    const borderStrokeWidth = 20 * s;
    const borderRadius = 120 * s;
    const iconSize = 1350 * s;
    const iconY = (canvas.height / 2) - (iconSize / 2);
    const bodySize = 120 * s;
    const headerSize = 240 * s;
    const minimumSize = 167 * s;
    const headerY = (iconY / 2) + (borderDistance / 2);
    const columnGap = 40 * s;
    /* Black Background */
    ctx.fillStyle = data_css.getPropertyValue("--black").trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    /* Border */
    /*ctx.strokeStyle = data_css.getPropertyValue("--white").trim();
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.roundRect(borderDistance, borderDistance, canvas.width - (borderDistance * 2), canvas.height - (borderDistance * 2), 80);
    ctx.stroke();*/
    export_cards_render_border_full(ctx, borderDistance, borderDistance, canvas.width - borderDistance * 2, canvas.height - borderDistance * 2, borderRadius, borderStrokeWidth, math_random_seed_generate(role.name || editor_untitled), borderWobble);
    /* Cut out bottom corners to make room for activate order number & role tag icons */
    ctx.fillStyle = data_css.getPropertyValue("--black").trim();
    ctx.shadowColor = data_css.getPropertyValue("--black").trim();
    const cutoutSize = (borderDistance * 3) + headerSize;
    const cutoutY = canvas.height - cutoutSize;
    if (role.activate) {
      let cutoutX = 0;
      ctx.shadowBlur = 100;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 200;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 300;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 400;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 500;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
    }
    if (role.tag_setup || role.tag_preserve) {
      let cutoutX = canvas.width - cutoutSize;
      ctx.shadowBlur = 100;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 200;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 300;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 400;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
      ctx.shadowBlur = 500;
      ctx.fillRect(cutoutX, cutoutY, cutoutSize, cutoutSize);
    }
    ctx.shadowColor = "#00000000";
    ctx.shadowBlur = 0;
    /* Draw role icon */
    if (role.icon) {
      try {
        let iconSrc = role.icon;
        if (role.format && role.icon) {
          iconSrc = await new Promise((resolve, reject) => {
            data_roles_format(role.icon, role.type, resolve);
          });
        }
        const icon = await export_cards_load_image(iconSrc);
        ctx.drawImage(icon, paddingX, iconY, iconSize, iconSize);
      } catch (err) {
        ctx.fillStyle = data_css.getPropertyValue("--black").trim();
        ctx.fillRect(paddingX, iconY, iconSize, iconSize);
      }
    } else {
      ctx.fillStyle = data_css.getPropertyValue("--black").trim();
      ctx.fillRect(paddingX, iconY, iconSize, iconSize);
    }
    /* Role name */
    const roleColours = {
      Guest: "#" + colour_guest_hex,
      Stranger: "#" + colour_stranger_hex,
      Spirit: "#" + colour_spirit_hex,
      Item: "#" + colour_item_hex,
      Prompt: "#" + colour_prompt_hex
    };
    ctx.fillStyle = roleColours[role.type] || data_css.getPropertyValue("--white").trim();
    ctx.font = `${headerSize}px TGPHeader, sans-serif`;
    ctx.textAlign = "center";
    export_cards_rescale_centre(
      ctx,
      role.name,
      paddingX + (iconSize / 2),
      headerY,
      iconSize,
      headerSize,
      minimumSize
    );
    /* Activate order number */
    ctx.fillStyle = data_css.getPropertyValue("--light_grey").trim();
    ctx.font = `${headerSize}px TGPBody, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(role.activate || "", borderDistance + columnGap, canvas.height - borderDistance - columnGap - (headerSize / 2));
    /* Set up right side of canvas */
    let currentY = headerY - (headerSize * 1.5);
    /* Top label (win condition) */
    if (role.toplabel) {
      currentY += bodySize + (columnGap * 2);
      ctx.fillStyle = roleColours[role.type] || data_css.getPropertyValue("--white").trim();
      ctx.font = `${bodySize}px TGPBody, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(role.toplabel || editor_untitled, paddingX + iconSize + columnGap, currentY + (bodySize * 1.5));
      currentY += bodySize + (columnGap * 3);
    }
    /* Tag icons */
    const tagIcons = [];
    if (role.tag_setup) tagIcons.push("assets/tag_icons/setup.png");
    if (role.tag_preserve) tagIcons.push("assets/tag_icons/preserve.png");
    if (tagIcons.length > 0) {
      const tagSize = headerSize * 1.5;
      const totalWidth = (tagIcons.length * tagSize) + ((tagIcons.length - 1) * columnGap);
      let currentX = canvas.width - borderDistance - columnGap - totalWidth;
      const tagY = canvas.height - borderDistance - columnGap - tagSize;
      for (const src of tagIcons) {
        try {
          const icon = await export_cards_load_image(src);
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = tagSize;
          tempCanvas.height = tagSize;
          const tempCtx = tempCanvas.getContext("2d");
          if (!tempCtx) continue;
          tempCtx.drawImage(icon, 0, 0, tagSize, tagSize);
          tempCtx.globalCompositeOperation = "source-in";
          tempCtx.fillStyle = data_css.getPropertyValue("--light_grey").trim();;
          tempCtx.fillRect(0, 0, tagSize, tagSize);
          ctx.drawImage(tempCanvas, currentX, tagY);
        } catch (err) { }
        currentX += tagSize + columnGap;
      }
    }
    /* Ability text */
    if (role.ability1_icon && role.ability1_icon !== "none") {
      const heightDescend = await export_cards_render_ability(
        ctx,
        role,
        role.ability1_icon,
        role.ability1_name,
        role.ability1,
        paddingX + iconSize + columnGap,
        currentY,
        canvas.width - ((paddingX + borderDistance) * 2) - iconSize - (columnGap * 2),
        headerSize,
        bodySize,
        columnGap
      );
      currentY += heightDescend || 0;
    }
    if (role.ability2_icon && role.ability2_icon !== "none") {
      await export_cards_render_ability(
        ctx,
        role,
        role.ability2_icon,
        role.ability2_name,
        role.ability2,
        paddingX + iconSize + columnGap,
        currentY,
        canvas.width - ((paddingX + borderDistance) * 2) - iconSize - (columnGap * 2),
        headerSize,
        bodySize,
        columnGap
      );
    }
    resolve(canvas.toDataURL("image/png"));
  });

}

/* -------------------[ Render Role Card (Full Border) ]------------------- */
/* The complete border around the cards is multiple borders laid over top of each other */
function export_cards_render_border_full(ctx, x, y, width, height, radius, strokeWidth, rng, wbl) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = data_css.getPropertyValue("--white").trim();
  ctx.lineWidth = strokeWidth;
  /* Draw three lines over top of each other for the border */
  for (let pass = 0; pass < 3; pass++) {
    export_cards_render_border_line(ctx, x, y, width, height, radius, rng, wbl);
    ctx.stroke();
  }
}

/* -------------------[ Random Value Function ]------------------- */
function math_random_seed_hash(str) {
  let hash = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(hash ^ str.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return function () {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return hash >>> 0;
  };
}
function math_random_seed_generate(seed) {
  const hash = math_random_seed_hash(seed);
  let a = hash();
  let b = hash();
  let c = hash();
  let d = hash();
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    const t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    const result = (t + d) | 0;
    c = (c + result) | 0;
    return (result >>> 0) / (2 ** 32);
  };
}

/* -------------------[ Render Role Card (Single Border) ]------------------- */
/* This is the code for one single border */
function export_cards_render_border_line(ctx, x, y, w, h, r, rng, wbl = 16) {
  const wobble = wbl;
  const step = 90;
  const cornerLessWobble = 0.35;

  function jitter(n, amount = wobble) {
    return n + (rng() - 0.5) * amount;
  }
  ctx.beginPath();
  ctx.moveTo(jitter(x + r), jitter(y));
  for (let px = x + r; px <= x + w - r; px += step) {
    ctx.lineTo(jitter(px), jitter(y));
  }
  for (let a = -Math.PI / 2; a <= 0; a += 0.08) {
    ctx.lineTo(jitter(x + w - r + Math.cos(a) * r, wobble * cornerLessWobble), jitter(y + r + Math.sin(a) * r, wobble * cornerLessWobble));
  }
  for (let py = y + r; py <= y + h - r; py += step) {
    ctx.lineTo(jitter(x + w), jitter(py));
  }
  for (let a = 0; a <= Math.PI / 2; a += 0.08) {
    ctx.lineTo(jitter(x + w - r + Math.cos(a) * r, wobble * cornerLessWobble), jitter(y + h - r + Math.sin(a) * r, wobble * cornerLessWobble));
  }
  for (let px = x + w - r; px >= x + r; px -= step) {
    ctx.lineTo(jitter(px), jitter(y + h));
  }
  for (let a = Math.PI / 2; a <= Math.PI; a += 0.2) {
    ctx.lineTo(jitter(x + r + Math.cos(a) * r, wobble * cornerLessWobble), jitter(y + h - r + Math.sin(a) * r, wobble * cornerLessWobble));
  }
  for (let py = y + h - r; py >= y + r; py -= step) {
    ctx.lineTo(jitter(x), jitter(py));
  }
  for (let a = Math.PI; a <= Math.PI * 1.5; a += 0.2) {
    ctx.lineTo(jitter(x + r + Math.cos(a) * r, wobble * cornerLessWobble), jitter(y + r + Math.sin(a) * r, wobble * cornerLessWobble));
  }
  ctx.closePath();
}

/* -------------------[ Render Role Card (Ability) ]------------------- */
async function export_cards_render_ability(ctx, role, iconKey, title, text, x, y, maxWidth, headerSize, bodySize, gap) {
  /* If ability icon is set to "none," skip it */
  if (!iconKey || iconKey === "none") return 0;
  /* Set up values */
  const iconSize = headerSize * 2;
  const textX = x + iconSize + gap;
  /* Draw the icon */
  const iconSrc = editor_ability_icon_order[iconKey];
  if (iconSrc) {
    const icon = await export_cards_load_image(iconSrc);
    ctx.drawImage(icon, x, y + (headerSize / 2), iconSize, iconSize);
  }
  /* Title */
  ctx.fillStyle = data_css.getPropertyValue("--light_grey").trim();
  ctx.font = `${headerSize}px TGPHeader, sans-serif`;
  ctx.textAlign = "left";
  ctx.fillText(title || editor_untitled, textX, y + (headerSize * 1.5));
  /* Body text */
  ctx.fillStyle = data_css.getPropertyValue("--white").trim();
  ctx.font = `${bodySize}px TGPBody, sans-serif`;
  const textHeight = export_cards_wrap_justify(
    ctx,
    text || "",
    x + gap,
    y + iconSize + (gap * 3) + bodySize,
    maxWidth,
    bodySize * 1.35,
    true
  );
  /* Return the height of this entire ability block we just rendered */
  return iconSize + textHeight + (gap * 3);
}

/* -------------------[ Render Role Card (Image Loading) ]------------------- */
function export_cards_load_image(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* -------------------[ Render Role Card (Text Wrapping) ]------------------- */
function export_cards_rescale_centre(ctx, text, x, y, maxWidth, initialFontSize, minFontSize) {
  const fontParts = ctx.font.split(/(\s+)/);
  const fontFamily = fontParts.slice(1).join(" ");
  let fontSize = initialFontSize;
  while (fontSize > minFontSize) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    const width = ctx.measureText(text).width;
    if (width <= maxWidth) {
      break;
    }
    fontSize -= 1;
  }
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
}
function export_cards_wrap_justify(ctx, text, x, y, maxWidth, lineHeight, onCard) {
  const startY = y;
  let inParens = false;
  function renderLine(wordsArr, yPos, isLastLine, justify) {
    const lineText = wordsArr.join(" ");
    if (!justify || isLastLine || wordsArr.length === 1) {
      renderWords(wordsArr, yPos);
      return;
    }
    let charCount = 0;
    for (const w of wordsArr) {
      charCount += Math.max(0, w.length - 1);
    }
    const wordGaps = wordsArr.length - 1;
    const currentWidth = ctx.measureText(lineText).width;
    const extraSpace = Math.max(0, maxWidth - currentWidth);
    const wordPortion = extraSpace * 0.6;
    const charPortion = extraSpace * 0.4;
    const extraPerWordGap = wordGaps > 0 ? wordPortion / wordGaps : 0;
    const extraPerCharGap = charCount > 0 ? charPortion / charCount : 0;
    let cursorX = x;
    for (let w = 0; w < wordsArr.length; w++) {
      const word = wordsArr[w];
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (ch === "(") inParens = true;
        const prevFill = ctx.fillStyle;
        ctx.fillStyle = inParens ? data_css.getPropertyValue("--light_grey").trim() : prevFill;
        ctx.fillText(ch, cursorX, yPos);
        cursorX += ctx.measureText(ch).width;
        ctx.fillStyle = prevFill;
        if (ch === ")") inParens = false;
        if (i < word.length - 1) {
          cursorX += extraPerCharGap;
        }
      }
      if (w < wordsArr.length - 1) {
        cursorX += ctx.measureText(" ").width + extraPerWordGap;
      }
    }
  }
  function renderWords(wordsArr, yPos) {
    let cursorX = x;
    for (let w = 0; w < wordsArr.length; w++) {
      const word = wordsArr[w];
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (ch === "(") inParens = true;
        const prevFill = ctx.fillStyle;
        ctx.fillStyle = inParens ? data_css.getPropertyValue("--light_grey").trim() : prevFill;
        ctx.fillText(ch, cursorX, yPos);
        cursorX += ctx.measureText(ch).width;
        ctx.fillStyle = prevFill;
        if (ch === ")") inParens = false;
      }
      if (w < wordsArr.length - 1) {
        cursorX += ctx.measureText(" ").width;
      }
    }
  }
  /* onCard = true */
  if (onCard) {
    const paragraphs = text.split("\n");
    for (let p = 0; p < paragraphs.length; p++) {
      const words = paragraphs[p].split(/\s+/).filter(Boolean);
      let lineWords = [];
      for (let i = 0; i < words.length; i++) {
        const testLine = [...lineWords, words[i]].join(" ");
        if (ctx.measureText(testLine).width > maxWidth && lineWords.length > 0) {
          renderLine(lineWords, y, false, true);
          lineWords = [words[i]];
          y += lineHeight;
        } else {
          lineWords.push(words[i]);
        }
      }
      renderLine(lineWords, y, true, true);
      y += lineHeight * 2;
    }
    /* onCard = false */
  } else {
    const paragraphs = text.split("\n");
    let lines = [];
    for (let p = 0; p < paragraphs.length; p++) {
      const words = paragraphs[p].split(/\s+/).filter(Boolean);
      let lineWords = [];
      for (let i = 0; i < words.length; i++) {
        const testLine = [...lineWords, words[i]].join(" ");
        if (ctx.measureText(testLine).width > maxWidth && lineWords.length > 0) {
          lines.push({ words: lineWords, justify: true });
          lineWords = [words[i]];
        } else {
          lineWords.push(words[i]);
        }
      }
      if (lineWords.length) {
        lines.push({ words: lineWords, justify: false });
      }
    }
    if (lines.length > 2) {
      const first = lines[0];
      const restWords = lines.slice(1).flatMap(l => l.words);
      lines = [
        first,
        { words: restWords, justify: true }
      ];
    }
    /* Really short ability text (only one line) needs to be moved up so it's still aligned with the ability icon */
    if (lines.length === 1) {
      y += lineHeight / 2;
    }
    for (let i = 0; i < Math.min(2, lines.length); i++) {
      const line = lines[i];
      const isLast = i === Math.min(2, lines.length) - 1;
      renderLine(line.words, y, isLast, line.justify);
      y += lineHeight;
    }
  }
  return (y + lineHeight) - startY;
}

/* -------------------[ Get Proper Icon (Formatted Or Not) ]------------------- */
function data_roles_icon_get(role, callback) {
  if (!role.icon) return callback(null);
  const key = role.id + "_" + role.icon + "_" + role.format + "_" + role.type;
  if (data_roles_icon_cache.has(key)) {
    callback(data_roles_icon_cache.get(key));
    return;
  }
  if (!role.format) {
    callback(role.icon);
    return;
  }
  data_roles_format(role.icon, role.type, (result) => {
    data_roles_icon_cache.set(key, result);
    callback(result);
  });
}

/* -------------------[ Sort data_roles By Order ]------------------- */
function data_roles_order() {
  const type_order = sidebar_type_order;
  const result = [];
  type_order.forEach(type => {
    data_roles.forEach(role => {
      if ((role.type || sidebar_type_order[0]) === type) {
        result.push(role);
      }
    });
  });
  data_roles = [...result];
}

/* -------------------[ History For Undo / Redo ]------------------- */
function data_history_snapshot() {
  return JSON.stringify({
    roles: data_roles,
    project: data_project,
    selected: sidebar_selected,
    mode: sidebar_mode
  });
}
function data_history_restore(snapshot) {
  const parsed = JSON.parse(snapshot);
  data_roles = parsed.roles || [];
  data_project = parsed.project || site_project_default;
  sidebar_selected = parsed.selected || null;
  sidebar_mode = parsed.mode || "role";
  data_history_last = snapshot;
  data_roles_icon_cache.clear();
  if (sidebar_mode === "project") {
    editor_project_open();
  } else {
    data_roles_load();
    element_editor_project.classList.add("hidden");
  }
  sidebar_render();
  editor_unsaved();
}
function data_history_push() {
  const snapshot = data_history_snapshot();
  /* Don't save this snapshot if it's identical to last one */
  if (snapshot === data_history_last) { return; }
  data_history_last = snapshot;
  data_history_undo.push(snapshot);
  if (data_history_undo.length > data_history_limit) {
    data_history_undo.shift();
  }
  /* Clear redo history (because we've made an updated action) */
  data_history_redo = [];
}
function data_history_action_undo() {
  if (data_history_undo.length === 0) return;
  data_history_redo.push(data_history_snapshot());
  const snapshot = data_history_undo.pop();
  data_history_restore(snapshot);
}
function data_history_action_redo() {
  if (data_history_redo.length === 0) return;
  data_history_undo.push(data_history_snapshot());
  const snapshot = data_history_redo.pop();
  data_history_restore(snapshot);
}
function data_history_focus(element) {
  element.addEventListener("focus", () => {
    data_history_push();
  });
}

/* -------------------[ Custom Modal ]------------------- */
/* Reminder to self: absolutely must use async when making confirm modals pop up within functions! */
function modal_show(message, showCancel = false) {
  element_modal.main.classList.remove("hidden");
  element_modal.ok.classList.remove("hidden");
  element_modal.msg.classList.remove("hidden");
  element_modal.msg.textContent = message;
  element_modal.cancel.style.display = showCancel ? "inline-block" : "none";
}
function modal_show_alert(message) {
  return new Promise((resolve) => {
    modal_show(message, false);
    element_modal.ok.addEventListener("click", () => { element_modal.main.classList.add("hidden"); resolve(true); }, { once: true });
  });
}
function modal_show_confirm(message) {
  return new Promise((resolve) => {
    modal_show(message, true);
    element_modal.ok.addEventListener("click", () => { element_modal.main.classList.add("hidden"); resolve(true); }, { once: true });
    element_modal.cancel.addEventListener("click", () => { element_modal.main.classList.add("hidden"); resolve(false); }, { once: true });
  });
}
/* Choose new role or vanilla role */
async function modal_show_add_role() {
  return new Promise((resolve) => {
    element_modal.add_role.classList.remove("hidden");
    element_modal.main.classList.remove("hidden");
    element_modal.ok.classList.add("hidden");
    element_modal.msg.classList.add("hidden");
    element_modal.cancel.style.display = "inline-block";
    const cleanup = () => {
      element_modal.main.classList.add("hidden");
      element_modal.add_role.classList.add("hidden");
      element_modal.new_role.removeEventListener("click", onNew);
      element_modal.load_vanilla.removeEventListener("click", onVanilla);
      element_modal.cancel.removeEventListener("click", onCancel);
    };
    const onNew = () => {
      cleanup();
      resolve("new");
    };
    const onVanilla = () => {
      cleanup();
      resolve("vanilla");
    };
    const onCancel = () => {
      cleanup();
      resolve(null);
    };
    element_modal.new_role.addEventListener("click", onNew);
    element_modal.load_vanilla.addEventListener("click", onVanilla);
    element_modal.cancel.addEventListener("click", onCancel);
  });
}
/* Select vanilla role */
async function modal_show_vanilla_selector(vanilla_roles) {
  element_modal.ok.classList.remove("hidden");
  return new Promise((resolve) => {
    const select = element_modal.vanilla_select;
    select.innerHTML = "";
    vanilla_roles.forEach((role, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = role.name || "Unnamed Role";
      select.appendChild(option);
    });

    select.value = "0";
    update_vanilla_icon(vanilla_roles, select);
    select.onchange = () => { update_vanilla_icon(vanilla_roles, select); };

    element_modal.vanilla_select_container.classList.remove("hidden");
    element_modal.main.classList.remove("hidden");
    const cleanup = () => {
      element_modal.main.classList.add("hidden");
      element_modal.vanilla_select_container.classList.add("hidden");
      element_modal.ok.removeEventListener("click", onOK);
      element_modal.cancel.removeEventListener("click", onCancel);
    };
    const onOK = () => {
      const role = vanilla_roles[Number(select.value)] || null;
      cleanup();
      resolve(role);
    };
    const onCancel = () => {
      cleanup();
      resolve(null);
    };
    element_modal.ok.addEventListener("click", onOK);
    element_modal.cancel.addEventListener("click", onCancel);
  });
}
/* Update the display icon for which vanilla role has been selected */
function update_vanilla_icon(vanilla_roles, select) {
  const role = vanilla_roles[Number(select.value)];
  if (!role || !role.icon) {
    element_modal.vanilla_icon.src = "";
    element_modal.vanilla_icon.style.display = "none";
    return;
  }
  element_modal.vanilla_icon.src = role.icon;
  element_modal.vanilla_icon.style.display = "block";
}


/* -------------------[ Event Listeners ]------------------- */

/* Push to history when focussed on these elements */
/* We use this function to check for focus because the alternative is pushing every keystroke (ugly ugly nasty non-optimisation) */
data_history_focus(element_single_role_name);
data_history_focus(element_single_role_toplabel);
data_history_focus(element_single_role_ability1);
data_history_focus(element_single_role_ability2);
data_history_focus(element_single_role_ability1_name);
data_history_focus(element_single_role_ability2_name);
data_history_focus(element_single_role_activate);
data_history_focus(element_editor_project_name);
data_history_focus(element_editor_project_author);
data_history_focus(element_editor_project_description);

/* Search for roles in the sidebar */
element_sidebar_search.addEventListener("input", function () {
  sidebar_search = this.value.toLowerCase().trim();
  sidebar_render();
});

/* Changing role name */
element_single_role_name.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  if (this.value.trim() === "") {
    data_roles_get().name = site_roles_default.name;
  } else {
    const role = data_roles_get();
    if (!role) return;
    role.name = this.value;
  }
  data_roles_edited();
  sidebar_render();
  editor_unsaved();
});

/* Changing activate order number */
element_single_role_activate.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.activate = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing win condition */
element_single_role_toplabel.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.toplabel = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing ability 1 */
element_single_role_ability1.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.ability1 = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing ability 2 */
element_single_role_ability2.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.ability2 = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing image icon */
element_single_role_icon.addEventListener("change", function () {
  if (sidebar_selected === null) return;
  const file = this.files[0];
  editor_icon_upload(file, (icon) => {
    const role = data_roles_get();
    if (!role) return;
    data_history_push();
    /* Clear formatted icon cache */
    data_roles_format_cache_clear(role.id);
    /* Set new icon */
    role.icon = icon;
    editor_icon_render(icon);
    data_roles_edited();
    sidebar_render();
    editor_unsaved();
  });
});

/* Changing role type */
element_single_role_type.addEventListener("change", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  /* Change the actual type value */
  role.type = this.value;
  /* Clear formatted icon cache */
  data_roles_format_cache_clear(role.id);
  /* Update everything else */
  editor_icon_render(role.icon);
  data_roles_edited();
  sidebar_render();
  editor_unsaved();
  /* Update input and textarea highlight colour */
  const colour = data_css.getPropertyValue(colour_array[role.type] || "--type_guest").trim();
  document.documentElement.style.setProperty("--type_selected", colour);
  const colour_dark = data_css.getPropertyValue(colour_array_dark[role.type] || "--type_guest_dark").trim();
  document.documentElement.style.setProperty("--type_selected_dark", colour_dark);
  editor_enable_check();
});

/* Changing ability 1 icon */
element_single_role_ability1_type.addEventListener("change", function () {
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.ability1_icon = this.value;
  element_single_role_ability1_icon.src = editor_ability_icon_order[this.value];
  editor_enable_check();
  data_roles_edited();
  editor_unsaved();
});

/* Changing ability 2 icon */
element_single_role_ability2_type.addEventListener("change", function () {
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.ability2_icon = this.value;
  element_single_role_ability2_icon.src = editor_ability_icon_order[this.value];
  editor_enable_check();
  data_roles_edited();
  editor_unsaved();
});

/* Changing ability 1 name */
element_single_role_ability1_name.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.ability1_name = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing ability 2 name */
element_single_role_ability2_name.addEventListener("input", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  role.ability2_name = this.value;
  data_roles_edited();
  editor_unsaved();
});

/* Changing role tags */
element_single_role_tag_friendly.addEventListener("change", function () {
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.tag_friendly = this.checked;
  data_roles_edited();
  editor_unsaved();
});
element_single_role_tag_setup.addEventListener("change", function () {
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.tag_setup = this.checked;
  data_roles_edited();
  editor_unsaved();
});
element_single_role_tag_preserve.addEventListener("change", function () {
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.tag_preserve = this.checked;
  data_roles_edited();
  editor_unsaved();
});

/* Changing project metadata */
element_editor_project_name.addEventListener("input", function () {
  data_project.name = this.value;
  editor_unsaved();
});
element_editor_project_author.addEventListener("input", function () {
  data_project.author = this.value;
  editor_unsaved();
});
element_editor_project_description.addEventListener("input", function () {
  data_project.description = this.value;
  editor_unsaved();
});
element_editor_project_icon_input.addEventListener("change", function () {
  const file = this.files[0];
  editor_icon_upload(file, (icon) => {
    data_project.icon = icon;
    editor_project_icon_render(icon);
    editor_unsaved();
  });
});

/* Makes the "Add Role" button clickable to add a new role */
element_sidebar_add.addEventListener("click", data_roles_add_modal);

/* Makes the "Save" button clickable to save all data to local storage */
element_sidebar_save.addEventListener("click", () => {
  localStorage.setItem("data_storage", JSON.stringify({ roles: data_roles, project: data_project }));
  data_saved = true;
  sidebar_render_save();
});

/* Makes the button clickable to collapse or expand the sidebar */
element_sidebar_toggle.addEventListener("click", () => {
  sidebar_collapsed_main = !sidebar_collapsed_main;
  element_sidebar_main.classList.toggle("collapsed", sidebar_collapsed_main);
  element_sidebar_toggle.classList.toggle("collapsed", sidebar_collapsed_main);
  element_editor_main.classList.toggle("expanded", !sidebar_collapsed_main);
});

/* Makes the icon in the editor clickable to upload a different one */
element_editor_icon_upload.addEventListener("click", () => { element_single_role_icon.click(); });

/* Makes the export button clickable to export a JSON file */
element_editor_project_export_json.addEventListener("click", export_json);

/* Makes the import button clickable to load a JSON file (it technically "clicks" the hidden file upload area) */
element_editor_project_import_json.addEventListener("click", async () => {
  const ok = await modal_show_confirm("This will override all current data. Continue?"); if (!ok) return;
  element_editor_project_import_json_file.click();
});

/* Checks the hidden import file upload area for importing a JSON (indirectly "clicked" by the import button) */
element_editor_project_import_json_file.addEventListener("change", function () {
  const file = this.files[0];
  import_json(file);
  this.value = "";
});

/* Makes the button clickable to toggle role formatting */
element_single_role_format.addEventListener("click", function () {
  if (sidebar_selected === null) return;
  const role = data_roles_get();
  if (!role) return;
  data_history_push();
  role.format = !role.format;
  this.classList.toggle("on", role.format);
  editor_icon_render(role.icon);
  data_roles_edited();
  sidebar_render();
  editor_unsaved();
});

/* Makes the button clickable to delete a role */
element_single_role_delete.onclick = async (e) => {
  e.stopPropagation();
  if (sidebar_selected === null) return;
  const role = data_roles_get(); if (!role) return;
  const ok = await modal_show_confirm("Delete this role?"); if (!ok) return;
  const element = document.querySelector(".sidebar_entry.selected"); if (!element) return;

  data_roles_delete(element);
};

/* Makes the button clickable to open project metadata editor */
element_sidebar_project.addEventListener("click", () => {
  editor_project_open();
});

/* Makes the button clickable to upload a project icon */
element_editor_project_icon_upload.addEventListener("click", () => {
  element_editor_project_icon_input.click();
});

/* Makes the button clickable to export the scenario sheet */
element_editor_project_export_sheet.addEventListener("click", () => {
  export_sheet();
});

/* Makes the button clickable to export all card images */
element_editor_project_export_cards.addEventListener("click", () => {
  export_cards();
});

/* Makes the undo clickable to undo a change */
element_sidebar_undo.addEventListener("click", () => {
  data_history_action_undo();
});

/* Makes the redo clickable to restore a change after undoing */
element_sidebar_redo.addEventListener("click", () => {
  data_history_action_redo();
});

/* -------------------[ Drag & Drop Icons & Project Icon ]------------------- */
/* Event listeners for all drag & drop related actions */
["dragenter", "dragover", "dragleave", "drop"].forEach(event => {
  element_editor_icon_upload.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  element_editor_project_icon_upload.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});
/* Role icons */
element_editor_icon_upload.addEventListener("drop", (e) => {
  if (sidebar_selected === null) return;
  const file = e.dataTransfer.files[0];
  editor_icon_upload(file, (icon) => {
    const role = data_roles_get();
    if (!role) return;
    /* Clear formatted icon cache */
    data_roles_format_cache_clear(role.id);
    /* Set new icon */
    role.icon = icon;
    editor_icon_render(icon);
    data_roles_edited();
    sidebar_render();
    editor_unsaved();
  });
});
/* Project icon */
element_editor_project_icon_upload.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  editor_icon_upload(file, (icon) => {
    data_project.icon = icon;
    editor_project_icon_render(icon);
    editor_unsaved();
  });
});

/* -------------------[ Unsaved Changes Warning ]------------------- */
window.addEventListener("beforeunload", function (e) {
  if (!data_saved) {
    e.preventDefault();
  }
});

/* -------------------[ Keyboard Shortcuts ]------------------- */
window.addEventListener("keydown", function (e) {
  /* Detect keys (Windows "Ctrl" and Mac "command") */
  const key_ctrl = e.ctrlKey || e.metaKey;

  /* Ctrl + Z (Undo) */
  if (key_ctrl && e.key.toLowerCase() === "z" && !e.shiftKey) {
    e.preventDefault();
    data_history_action_undo();
    return;
  }

  /* Ctrl + Shift + Z (Redo) */
  if (key_ctrl && e.key.toLowerCase() === "z" && e.shiftKey) {
    e.preventDefault();
    data_history_action_redo();
    return;
  }

  /* Ctrl + S (Save data) */
  if (key_ctrl && e.key.toLowerCase() === "s") {
    e.preventDefault();
    element_sidebar_save.click();
    return;
  }

  /* Ctrl + Enter (Add new role) */
  if (key_ctrl && e.key.toLowerCase() === "enter") {
    e.preventDefault();
    data_roles_add_new();
    return;
  }

  /* Ctrl + Shift + Delete (Delete role) */
  if (key_ctrl && (e.key.toLowerCase() === "delete" || e.key.toLowerCase() === "backspace") && e.shiftKey) {
    e.preventDefault();
    if (sidebar_selected === null) return;
    const role = data_roles_get();
    if (!role) return;
    const element = document.querySelector(".sidebar_entry.selected");
    data_roles_delete(element);
    return;
  }

  /* Ctrl + Shift + Backslash (Delete role / project icon) */
  if (key_ctrl && e.key === "\\" && e.shiftKey) {
    e.preventDefault();
    if (sidebar_mode === "role" && sidebar_selected !== null) {
      const role = data_roles_get();
      if (!role.icon) return;
      if (role.is_vanilla) return;
      data_history_push();
      data_roles_format_cache_clear(role.id);
      role.icon = "";
      editor_icon_render("");
      sidebar_render();
      editor_unsaved();
      return;
    }
    if (sidebar_mode === "project") {
      if (!data_project.icon) return;
      data_history_push();
      data_project.icon = "";
      editor_project_icon_render("");
      editor_unsaved();
      return;
    }
  }

  /* Ctrl + Up (Move role upwards in list) */
  if (key_ctrl && e.key.toLowerCase() === "arrowup") {
    e.preventDefault();
    if (sidebar_selected === null) return;
    const index = data_roles.findIndex(r => r.id === sidebar_selected);
    if (index <= 0) return;
    data_history_push();
    [data_roles[index - 1], data_roles[index]] = [data_roles[index], data_roles[index - 1]];
    sidebar_render();
    editor_unsaved();
    return;
  }

  /* Ctrl + Down (Move role downwards in list) */
  if (key_ctrl && e.key.toLowerCase() === "arrowdown") {
    e.preventDefault();
    if (sidebar_selected === null) return;
    const index = data_roles.findIndex(r => r.id === sidebar_selected);
    if (index === -1 || index >= data_roles.length - 1) return;
    data_history_push();
    [data_roles[index + 1], data_roles[index]] = [data_roles[index], data_roles[index + 1]];
    sidebar_render();
    editor_unsaved();
    return;
  }

  /* Ctrl + K (Duplicate role) */
  if (key_ctrl && (e.key.toLowerCase() === "k")) {
    e.preventDefault();
    const role = data_roles_get();
    if (!role) return;
    const clone = typeof structuredClone === "function" ? structuredClone(role) : JSON.parse(JSON.stringify(role));
    clone.id = data_roles_uuid();
    /* Count existing copies */
    const copy_matches_regular = role.name.match(/(?: Copy)+$/);
    const copy_count_regular = copy_matches_regular ? (copy_matches_regular[0].match(/ Copy/g) || []).length : 0;
    /* Funny Easter egg */
    if (copy_count_regular >= 5) {
      clone.name = role.name.replace(/(?: Copy)+$/, "") + " Grandest Copy";
    } else {
      clone.name = role.name + " Copy";
    }
    clone.is_vanilla = false;
    const index = data_roles.findIndex(r => r.id === sidebar_selected);
    if (index === -1) return;
    data_roles.splice(index + 1, 0, clone);
    sidebar_selected = clone.id;
    sidebar_render();
    data_roles_load();
    editor_unsaved();
  }

  /* Ctrl + Shift + M (Force enable editing of areas which really shouldn't be enabled) */
  if (key_ctrl && e.key.toLowerCase() === "m" && e.shiftKey) {
    e.preventDefault();
    modal_show_alert("Disabled inputs have been unlocked through a keyboard shortcut. Editing this role could cause issues unless you know what you're doing. Click off this role and back on again to return to a safe version.");
    editor_enable_force();
  }

  /* Slash (Focus on role name input) */
  if (e.key === "/" && !key_ctrl && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    element_single_role_name.focus();
  }

  /* Number 1 (Focus on ability1 input) */
  if (e.key === "1" && !key_ctrl && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    element_single_role_ability1.focus();
  }

  /* Number 2 (Focus on ability2 input) */
  if (e.key === "2" && !key_ctrl && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    element_single_role_ability2.focus();
  }

});

/* -------------------[ Initiate Editor (This Runs On Page Load) ]------------------- */
/* Add the relevant data to the footer */
element_editor_footer_year.textContent = new Date().getFullYear();
element_editor_footer_version.textContent = site_version;
/* Adds some classes the editor & sidebar need */
element_sidebar_main.classList.toggle("collapsed", sidebar_collapsed_main);
element_sidebar_toggle.classList.toggle("collapsed", sidebar_collapsed_main);
element_editor_main.classList.toggle("expanded", !sidebar_collapsed_main);
element_sidebar_main.classList.toggle("expanded", !sidebar_collapsed_main);
/* */
editor_ability_icon_init(element_single_role_ability1_type);
editor_ability_icon_init(element_single_role_ability2_type);
data_storage_load();
if (data_roles.length === 0) {
  editor_project_open();
} else {
  sidebar_selected = data_roles[0].id;
  data_roles_load();
}
sidebar_render();
sidebar_render_save();
data_history_push();