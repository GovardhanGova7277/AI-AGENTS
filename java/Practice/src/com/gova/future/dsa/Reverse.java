public class Reverse {
    public static void main(String[] args) {

        String name = "Govardhan";
        StringBuffer reversedName = new StringBuffer();

        for(int i=name.length() - 1;i>=0;i--){
            reversedName.append(name.charAt(i));
        }
        System.out.println(reversedName);
    }
}
