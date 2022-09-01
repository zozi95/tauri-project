#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    hello_sign,sign
  ])
  .run(tauri::generate_context!())
  .expect("error while running tauri applicationdd");
}

#[tauri::command]
fn hello_sign() {
  println!("hello sign has been called");

}

#[tauri::command]
fn sign() {
  println!("hello sign ");

}